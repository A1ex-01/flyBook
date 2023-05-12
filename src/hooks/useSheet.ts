import { useMySelect } from "@/store"
import { createSheet, updateSheetRow } from "@/store/modules/sheetsSlice"
import { useCallback, useMemo } from "react"
import { useDispatch } from "react-redux"

export default () => {
	const dispatch = useDispatch()
	const sheets = useMySelect((state) => state.sheet)
	const sheetArr = useMemo(() => Object.values(sheets), [sheets])
	const getSheet = useCallback((sheetId: string) => sheets[sheetId], [sheets])
	const getView = useCallback((sheetId: string, viewId: string) => sheets[sheetId].views[viewId], [sheets])
	const getViewArr = useCallback((sheetId: string) => Object.values(sheets[sheetId].views), [sheets])
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
	return {
		sheets,
		sheetArr,
		getSheet,
		getView,
		createSheetDispatcher,
		getViewArr,
		getViewColumns,
		getRowInfo,
		updateSheetRows
	}
}
