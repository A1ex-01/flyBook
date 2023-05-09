import { Key } from "react"
export type ColumnMap = {
	TEXT: {
		id: Key
	}
	SELECT: {
		options: { label: string; value: string; id: Key }[]
	}
}
export interface ColumnConfig {
	width: number
	sort: number
}
export interface Column<ColumnType extends keyof ColumnMap> {
	id: Key
	name: string
	columnType: ColumnType
	columnProps: any
}
export interface View {
	id: Key
	name: string
	columnsConfig: {
		[columnId: Key]: ColumnConfig
	}
}
export interface Row {
	id: Key
	[columnId: Key]: Key
}
export interface Sheet {
	id: Key
	name: string
	columns: {
		[columnId: Key]: Column<any>
	}
	views: {
		[viewId: Key]: View
	}
	rows: {
		[rowId: Key]: Row
	}
}
