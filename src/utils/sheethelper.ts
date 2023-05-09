import { Column, ColumnConfig, Row, Sheet, View } from "@/store/modules/sheetTypes"
import { Key } from "react"
import { v4 as uuid } from "uuid"
export const columnTemelateCreator: (name: string) => Column<"TEXT"> = (name) => {
	const columnId = uuid()
	return {
		id: columnId,
		name,
		columnType: "TEXT",
		columnProps: {}
	}
}
export const viewTemelateCreator: (name: string, colummnIdArr?: Key[]) => View = (name, colummnIdArr = []) => {
	const viewId = uuid()
	const columnsConfig: { [key: string]: ColumnConfig } = {}
	colummnIdArr.forEach((colummnId) => {
		columnsConfig[colummnId] = {
			width: 180,
			sort: 0
		}
	})
	return {
		id: viewId,
		name,
		columnsConfig
	}
}
export const rowTeelateCreator: (colummnIdArr?: Key[]) => Row = (colummnIdArr?: Key[]) => {
	const rowObj: { [key: string]: string } = {}
	colummnIdArr?.forEach((colummnId) => {
		rowObj[colummnId] = ""
	})
	return {
		id: uuid(),
		...rowObj
	}
}

export const sheetTemplateCreator: (name: string) => Sheet = (name: string) => {
	const defaultColumn = columnTemelateCreator("多行文本")
	const defaultView = viewTemelateCreator("默认表", [defaultColumn.id])
	const defaultRow = rowTeelateCreator([defaultColumn.id])
	const sheetId = uuid()
	return {
		id: sheetId,
		name,
		columns: {
			[defaultColumn.id]: defaultColumn
		},
		views: {
			[defaultView.id]: defaultView
		},
		rows: {
			[defaultRow.id]: defaultRow
		}
	}
}
