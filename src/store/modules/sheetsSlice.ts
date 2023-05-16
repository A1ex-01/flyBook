import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Sheet } from "./sheetTypes"
import { sheetTemplateCreator } from "@/utils/sheethelper"
import { MessageInstance } from "antd/es/message/interface"
// import { message } from "antd"
import {message} from "@/common/WithAntd"
// import { SheetOperator } from "@/components/operations/SheetOperator"
// const {message} = App.useApp()
const state: {
	[sheetId: string]: Sheet
} = {
	"50da7178-9fbf-4a19-b8bb-06514c2832b5": {
		id: "50da7178-9fbf-4a19-b8bb-06514c2832b5",
		name: "数据表一",
		columns: {
			"3a58fc5e-ea62-480c-b5fd-3e100c05c824": {
				id: "3a58fc5e-ea62-480c-b5fd-3e100c05c824",
				name: "多行文本1",
				columnType: "TEXT",
				columnProps: {}
			},
			"1a58fc5e-ea62-480c-b5fd-3e100c05c824": {
				id: "1a58fc5e-ea62-480c-b5fd-3e100c05c824",
				name: "多行文本2",
				columnType: "TEXT",
				columnProps: {}
			},
			"1a58fc5e-ea62-480c-b6fd-3e200c05c824": {
				id: "1a58fc5e-ea62-480c-b6fd-3e200c05c824",
				name: "多行文本3",
				columnType: "TEXT",
				columnProps: {}
			}
		},
		views: {
			"f686b38c-215b-4eff-86e5-9a10e93041c8": {
				id: "f686b38c-215b-4eff-86e5-9a10e93041c8",
				name: "默认表",
				columnsConfig: {
					"3a58fc5e-ea62-480c-b5fd-3e100c05c824": {
						width: 120,
						sort: 0
					},
					"1a58fc5e-ea62-480c-b5fd-3e100c05c824": {
						width: 200,
						sort: 0
					},
					"1a58fc5e-ea62-480c-b6fd-3e200c05c824": {
						width: 300,
						sort: 0
					}
				}
			}
		},
		rows: {
			"50da7078-9faf-4a19-b8bb-06514c2832b5": {
				id: "50da7078-9faf-4a19-b8bb-06514c2832b5",
				"3a58fc5e-ea62-480c-b5fd-3e100c05c824": "hello",
				"1a58fc5e-ea62-480c-b5fd-3e100c05c824": "word",
				"1a58fc5e-ea62-480c-b6fd-3e200c05c824": ""
			},
			"50d7a078-9faf-4a19-b8bb-02214c2832b5": {
				id: "50d7a078-9faf-4a19-b8bb-02214c2832b5",
				"3a58fc5e-ea62-480c-b5fd-3e100c05c824": "a1ex",
				"1a58fc5e-ea62-480c-b5fd-3e100c05c824": "colin",
				"1a58fc5e-ea62-480c-b6fd-3e200c05c824": ""
			},
			"50d7a078-9faf-4a19-b8bb-0221400832b5": {
				id: "50d7a078-9faf-4a19-b8bb-0221400832b5",
				"3a58fc5e-ea62-480c-b5fd-3e100c05c824": "a1ex",
				"1a58fc5e-ea62-480c-b5fd-3e100c05c824": "colin",
				"1a58fc5e-ea62-480c-b6fd-3e200c05c824": "2"
			}
		}
	}
}
// const sheetOperator = new SheetOperator()
const sheetSlice = createSlice({
	name: "sheet",
	initialState: state,
	reducers: {
		createSheet(state, action: PayloadAction<{ name: string }>) {
			// state["123-321"] = action.payload.sheet
			// 构建一个表
			const sheetCount = Object.keys(state).length
			const sheet = sheetTemplateCreator(action.payload.name || `数据表${sheetCount + 1}`)
			state[sheet.id] = sheet
			message!.success(`创建表成功,表名为${action.payload.name}`)
		},
		deleteSheet() {
			console.log(1)
		},
		updateSheetRow(state, action: PayloadAction<{ sheetId: string; rowId: string; columnId: string; newValue: string }>) {
			const { sheetId, rowId, columnId, newValue } = action.payload
			const sheet = state[sheetId]
			if (sheet) {
				state[sheetId].rows[rowId][columnId] = newValue
				message!.success(`更新单元格成功,内容更新为${newValue}`)
			}
		},
		renameSheet(state, action: PayloadAction<{ sheetId: string; newValue: string }>) {
			const { sheetId, newValue } = action.payload
			const sheet = state[sheetId]
			if (sheet) {
				state[sheetId].name = newValue
				message!.success(`重命名成功,表名更新为${newValue}`)
			}
		}
	}
})

export default sheetSlice.reducer
export const { createSheet, deleteSheet, renameSheet, updateSheetRow } = sheetSlice.actions
