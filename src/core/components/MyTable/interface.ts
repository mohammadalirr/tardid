import { QueryObserverBaseResult, useMutation } from '@tanstack/react-query'
import { DataTable, DataTableColumn } from 'mantine-datatable'
import useUrlQuery from '~/core/hooks/useUrlQuery/useUrlQuery'
import { ReactNode } from 'react'
import { TableColumn } from '../type'

export type Query = QueryObserverBaseResult & {
  data: any[]
  helpers: ReturnType<typeof useUrlQuery>
  total: number
}

export interface MyTableEntity<T> extends ReturnType<typeof DataTable<T>> {
  query: Query
  columns: TableColumn<T>[]
  baseAdminUrl: string
  selectedMutation?: ReturnType<typeof useMutation> // soft delete
  multiSelectedMutation?: ReturnType<typeof useMutation> // multi soft delete
  showModalDetail: (data: T) => void
  isEdit?: boolean
  isDeleted?: boolean
  extraActions?: (item: any) => ReactNode
  showLink?: string
}