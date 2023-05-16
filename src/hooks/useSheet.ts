import { useMySelect } from "@/store"
import { createSheet, renameSheet, updateSheetRow } from "@/store/modules/sheetsSlice"
import { MessageInstance } from "antd/es/message/interface"
import { Key, useCallback, useMemo } from "react"
import { useDispatch } from "react-redux"

export default () => {
	const dispatch = useDispatch()
	const sheets = useMySelect((state) => state.sheet)
	const sheetArr = useMemo(() => Object.values(sheets), [sheets])
	const getSheet = useCallback((sheetId: string) => sheets[sheetId], [sheets])
	const getView = useCallback((sheetId: string, viewId: string) => sheets[sheetId].views[viewId], [sheets])
	const getViewArr = useCallback((sheetId: string) => Object.values(sheets[sheetId].views), [sheets])
	const getRows = useCallback((sheetId: string) => sheets[sheetId].rows, [sheets])
	const getRowsArr = useCallback((sheetId: string) => Object.values(sheets[sheetId].rows), [sheets])

	const getViewColumns = useCallback(
		(sheetId: string, viewId: string) => {
			const targetSheet = sheets[sheetId]
			const targetView = sheets[sheetId].views[viewId]
			return {
				columns: targetSheet.columns,
				columnArr: Object.values(targetSheet.columns),
				columnsConfig: targetView.columnsConfig,
				columnArrConfig: Object.values(targetView.columnsConfig),
				sheetId,
				viewId
			}
		},
		[sheets]
	)
	const createSheetDispatcher = useCallback((name: string = "") => dispatch(createSheet({ name })), [sheets])

	const getRowInfo = useCallback(
		(sheetId: string) => {
			const targetRow = sheets[sheetId].rows
			return Object.values(targetRow)
		},
		[sheets]
	)
	const updateSheetRows = useCallback(
		(sheetId: string, rowId: string, columnId: string, newValue: string = "") => {
			dispatch(updateSheetRow({ sheetId, rowId, columnId, newValue }))
		},
		[sheets]
	)
	const updateSheetNameBySheetId = useCallback((sheetId:string, newValue:string) => {
		dispatch(renameSheet( {sheetId, newValue } ))
	}, [sheets])
	return {
		sheets,
		sheetArr,
		getSheet,
		getView,
		getRows,
		getRowsArr,
		createSheetDispatcher,
		getViewArr,
		getViewColumns,
		getRowInfo,
		updateSheetRows,
		updateSheetNameBySheetId
	}
}
