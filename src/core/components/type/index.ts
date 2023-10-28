import { BoxProps, ButtonProps } from "@mantine/core"
import { useMutation } from "@tanstack/react-query"
import { DataTableColumn } from "mantine-datatable"

export interface AbstractFormProps {
    initialValues: Record<string, any>
    validate: Record<string, any>
    isEdit?: boolean
    pageProps?: any
    mutation: ReturnType<typeof useMutation<any, any, any, any>>
}

export enum ColumnTypeEnum {
    image = 'image',
    text = 'text',
    boolean = 'boolean',
    date = 'date',
    dateTime = 'dateTime',
    time = 'time',
    price = 'price',
    link = 'link'
}
export type ColumnType = `${ColumnTypeEnum}`

export type TableColumn<T> = DataTableColumn<T> & {
    type?: ColumnType
}
  
export interface SquareProps extends BoxProps {
    size?: string | number
    border?: number
    color?: string
    flipX?: boolean
    dir?: 'top' | 'bottom'
}

export interface DotsProps extends BoxProps {
    size?: number
    color?: string
}

export interface MyButtonProps extends ButtonProps {
    hideArrow?: boolean
    bg?: string
    iconBg?: string
    iconStyle?: any
    onClick?: () => void
}