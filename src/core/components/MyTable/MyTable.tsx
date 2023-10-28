import { ActionIcon, Avatar, Center, Group, Text, Tooltip } from '@mantine/core'
import { IconCircleCheck, IconCircleX, IconEdit, IconEye, IconTrash, IconTrashX } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import Router from 'next/router'
import { useMemo, useState } from 'react'
import { openMultiSelectedModal, openSelectModal } from '../MyModal/MyModal'
import { MyTableEntity } from './interface'
import { ColumnType, ColumnTypeEnum, TableColumn } from '../type'
import { getImage } from '~/core/helpers/Formatter'
import dayjs from 'dayjs'
import { useAuthSession } from '~/core/hooks/useAuthSession/useAuthSession'
import { formatDate, formatDateTime } from '~/core/helpers/Date'
import Link from 'next/link'

function MyTable<T>(props: MyTableEntity<T>) {
  const {
    query,
    columns,
    baseAdminUrl,
    selectedMutation,
    multiSelectedMutation,
    showModalDetail,
    extraActions,
    isEdit = true,
    isDeleted = true,
    showLink = '',
    ...otherProps
  } = props

  const { data, total, isFetching } = query
  const queryAuth = useAuthSession();

  const [selectedRecords, setSelectedRecords] = useState<T[]>([])

  // custom columns
  const showLinkActive = false
  const defaultColumns: TableColumn<T | any>[] = [
    ...columns,
    {
      accessor: 'actions',
      title: 'عملیات',
      textAlignment: 'center',
      width: showLinkActive ? 150 : 100,
      render: (info) => {
        const id = String(info.id)
        return (
          <Group spacing={4} position="center" noWrap>
            {/* Check Edit */}
            {isEdit && (
              <Tooltip
                key={'edit'}
                transitionProps={{ transition: 'pop', duration: 300 }}
                label="ویرایش"
              >
                <ActionIcon
                  size="lg"
                  color="blue"
                  component="a"
                  href={`${baseAdminUrl}/edit/${id}`}
                >
                  <IconEdit size={22} />
                </ActionIcon>
              </Tooltip>
            )}

            {/* Check Deleted */}
            {isDeleted && (
              <Tooltip
                key={'delete'}
                transitionProps={{ transition: 'pop', duration: 300 }}
                label="حذف"
              >
                <ActionIcon
                  size="lg"
                  color="red"
                  onClick={() =>
                    // @ts-expect-error
                    openSelectModal({ id, mutation: selectedMutation, query })
                  }
                >
                  <IconTrash size={22} />
                </ActionIcon>
              </Tooltip>
            )}

            {showLinkActive && (
              <Tooltip
                key={'show'}
                transitionProps={{ transition: 'pop', duration: 300 }}
                label="Show"
              >
                <ActionIcon
                  size="lg"
                  color='gray'
                  onClick={() => {
                    const link = showLink.replace(':store', '')
                      .replace(':id', id).replace(':name', info.name)
                    window.open(encodeURI(link))
                  }}
                >
                  <IconEye size={22} />
                </ActionIcon>
              </Tooltip>
            )}

            {extraActions !== undefined ? extraActions(info) : null}
          </Group>
        )
      },
    },
  ]

  let newColumns: TableColumn<T | any>[] = []

  if (!isEdit && !isDeleted && extraActions === undefined) {
    newColumns = [...columns]
  } else {
    newColumns = defaultColumns
  }

  const _2part = (_: any) => _?.includes('.')

  const renderItem = (e: TableColumn<any>, info: any) => {
    switch (e.type) {
      case 'boolean': 
        return <Center>{!!info[e.accessor] ? <IconCircleCheck color='green' /> : <IconCircleX color='red' />}</Center>
      case 'image': 
        return <Center><Avatar src={_2part(e.accessor) ? getImage(info[e.accessor.split('.')[0]][e.accessor.split('.')[1]]) : getImage(info[e.accessor])} size='md' /></Center>
      case 'date':
        return <div>{formatDate(info[e.accessor])}</div>
      case 'dateTime':
        return <div>{formatDateTime(info[e.accessor])}</div>
      case 'link':
        return !!info[e.accessor] ? <Link target='_blank' href={info[e.accessor]}>
          <Text underline color='indigo' size='xs'>{info[e.accessor]}</Text>
        </Link> : undefined
      case 'price':
        return <div>{info[e.accessor]}</div>
      default:
        return undefined
    }
  }

  const textAlignment = (type?: ColumnType) => {
    switch (type) {
      case 'boolean': 
        return 'center'
      case 'image': 
        return 'center'
      default:
        return undefined
    }
  }

  const width = (type?: ColumnType) => {
    switch (type) {
      case 'boolean': 
        return 90
      case 'image': 
        return 90
      default:
        return undefined
    }
  }

  return (
    <DataTable
      withBorder
      minHeight={(data ?? []).length === 0 ? 300 : 150}
      borderRadius="md"
      withColumnBorders
      striped={false}
      highlightOnHover
      verticalAlignment="center"
      verticalSpacing="md"
      horizontalSpacing="md"
      fetching={isFetching}
      columns={newColumns.map(e => {
        const hasType = Object.values(ColumnTypeEnum).includes(e?.type as any)
        return {
          textAlignment: textAlignment(e.type),
          width: width(e.type),
          render: hasType
            ? (info: any) => renderItem(e, info)
            : undefined,
          ...e
        }
      })}
      records={(data ?? [])}
      totalRecords={total}
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={setSelectedRecords}
      rowContextMenu={{
        borderRadius: 'md',
        items: (info) => [
          // {
          //   key: 'detail',
          //   icon: <IconEye size={16} />,
          //   title: `Detail`,
          //   onClick: () => showModalDetail(info),
          // },
          {
            key: 'edit',
            icon: <IconEdit size={16} />,
            title: `Edit`,
            hidden: !isEdit,
            // @ts-ignore
            onClick: () => Router.push(`${baseAdminUrl}/edit/${info.id}`),
          },
          {
            key: 'delete',
            title: `Delete`,
            icon: <IconTrashX size={16} />,
            color: 'red',
            hidden:
              !isDeleted ||
              (selectedRecords.length !== 0 && selectedRecords.length > 1),
            onClick: () =>
              openSelectModal({
                id: info.id,
                // @ts-expect-error
                mutation: selectedMutation,
                query,
              }),
          },
          // @ts-ignore
          { key: 'divider-1', divider: true, color: 'gray' },
          {
            key: 'deleteMany',
            hidden:
              !isDeleted ||
              selectedRecords.length <= 1 ||
              // @ts-ignore
              !selectedRecords.map((r) => r.id).includes(info.id),
            title: `Delete ${selectedRecords.length} selected records`,
            icon: <IconTrash size={16} />,
            color: 'red',
            onClick: () =>
              openMultiSelectedModal({
                // @ts-expect-error
                ids: selectedRecords?.map((e) => e.id),
                // @ts-expect-error
                mutation: multiSelectedMutation,
                query,
              }),
          },
        ],
      }}
      {...otherProps}
    />
  )
}

export default MyTable
