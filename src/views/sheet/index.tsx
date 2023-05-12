import { IconTable, IconDotsVertical, IconPlus, IconListNumbers } from "@tabler/icons-react"
import { Button, Input } from "antd"
import React, { memo, useCallback, useLayoutEffect, useMemo, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { toolTabs } from "./toolTabs"

import { Stage, Layer, Star, Text, Rect, Group } from "react-konva"
import { KonvaEventObject } from "konva/lib/Node"
import { ColumnMap } from "@/store/modules/sheetTypes"
import { Html } from "react-konva-utils"
import useSheet from "@/hooks/useSheet"
const Sheet = memo(() => {
	const { sheetId, viewId } = useParams<{ sheetId: string; viewId: string }>()

	// 绘制canvas画布
	const canvasContainer = useRef<HTMLDivElement>(null)
	const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
	useLayoutEffect(() => {
		setCanvasSize({ width: canvasContainer.current!.offsetWidth, height: canvasContainer.current!.offsetHeight })
	}, [canvasContainer])

	const [currRowId, setCurrRowId] = useState<string | null>(null)
	const [currColId, setCurrColId] = useState<string | null>(null)

	// 编辑行
	const editInputRef = useRef<HTMLDivElement>(null)
	const [editInputValue, setEditInputValue] = useState<string>("")
	const [editInputType, setEditInputType] = useState<keyof ColumnMap | null>(null)
	const editTableCell = useCallback(
		(event: KonvaEventObject<MouseEvent>, columnType: keyof ColumnMap, width: number, rowId: string, colId: string, value: string) => {
			const { x, y } = event.target.attrs
			setEditInputType(columnType)
			// 保存行id
			setCurrRowId(rowId)
			setCurrColId(colId)
			// 设置input框位置
			requestIdleCallback(() => {
				editInputRef.current!.style.left = x + "px"
				editInputRef.current!.style.top = y + "px"
				setEditInputValue(value)
				;(editInputRef.current!.children[0] as any).focus()
				;(editInputRef.current!.children[0] as any).style.width = width + "px"
			})
		},
		[]
	)

	// 编辑列
	const { getViewColumns, getRowInfo, updateSheetRows } = useSheet()
	const columnHeaderWidth = useMemo(() => {
		const { columnArrConfig } = getViewColumns(sheetId!, viewId!)
		return columnArrConfig.reduce((pre, cur) => {
			return pre + cur.width
		}, 0)
	}, [sheetId, viewId, getViewColumns])

	const columnArrList = useMemo(() => {
		const { columnArr, columnsConfig, columnArrConfig, columns } = getViewColumns(sheetId!, viewId!)
		return { columnArr, columnsConfig, columnArrConfig, columns }
	}, [sheetId, viewId, getViewColumns])

	// 通过索引拿到对应总宽
	const getXByIndex = useCallback(
		(index: number) => {
			return columnArrList.columnArrConfig.reduce((pre, cur, i) => {
				if (i === index) {
					return pre
				}
				if (i > index) {
					return pre
				}
				return pre + cur.width
			}, 0)
		},
		[columnArrList]
	)
	return (
		<div className="flex items-start flex-col">
			<div className="flex items-center">
				<div className="h-6 rounded-t-md bg-white px-3 py-4 flex items-center">
					<IconTable size={14} className="mr-2r" color={"#3370ff"} />
					表格
					<IconDotsVertical size={13} className="ml-2 cursor-pointer" />
				</div>
				<div className="px-3 cursor-pointer">
					<IconPlus size={16} />
				</div>
			</div>
			<div className="bg-white w-full rounded-r-md pl-2">
				<div className="options flex py-2">
					{toolTabs.map((parentTab, index) => {
						return (
							<div key={index} className="flex items-center">
								<div key={index} className="flex">
									{parentTab.map((tab) => (
										<div key={tab.id} className="py-1 px-2 rounded-md flex items-center mr-2 gap-2 cursor-pointer hover:bg-gray-100">
											{tab.icon}
											{tab.name}
										</div>
									))}
								</div>
								<div
									style={{
										backgroundColor: "#dededf",
										width: "1px",
										borderRadius: "1px",
										display: index === toolTabs.length - 1 ? "none" : "block"
									}}
								></div>
							</div>
						)
					})}
				</div>
				{/* canvas视图 */}
				<div className="h-80 relative" ref={canvasContainer}>
					<Stage width={canvasSize.width} height={canvasSize.height}>
						<Layer>
							<Html>
								<div style={{ width: columnHeaderWidth, height: "30px" }} className="flex items-center">
									{columnArrList.columnArr.map((column) => {
										return (
											<div
												key={column.id}
												style={{ width: columnArrList.columnsConfig[column.id].width, borderColor: "#ddd" }}
												className="flex items-center border border-solid h-9 px-2"
											>
												<IconListNumbers size={16} className="mr-2" />
												{column.name}
											</div>
										)
									})}
								</div>
							</Html>
							{columnArrList.columnArr.map((column, index) => {
								return (
									<Group key={column.id}>
										<Rect
											x={0 + getXByIndex(index)}
											y={32}
											width={columnArrList.columnsConfig[column.id].width}
											height={30}
											strokeWidth={1}
											stroke={"#ddd"}
											onDblClick={(event) =>
												editTableCell(
													event,
													columnArrList.columns[column.id].columnType,
													columnArrList.columnsConfig[column.id].width,
													getRowInfo(sheetId as string)?.find((rowObj) => rowObj[column.id] !== undefined)?.id as string,
													column.id as string,
													getRowInfo(sheetId as string)?.find((rowObj) => rowObj[column.id] !== undefined)?.[column.id] as string
												)
											}
										/>
										<Text
											x={0 + getXByIndex(index)}
											y={32}
											padding={10}
											fontSize={14}
											text={getRowInfo(sheetId as string)?.find((rowObj) => rowObj[column.id] !== undefined)?.[column.id] as string}
										/>
									</Group>
								)
							})}
						</Layer>
					</Stage>
					<div className="faster-overlay absolute" ref={editInputRef}>
						{editInputType === "TEXT" && (
							<Input
								style={{ height: "30px", width: "180px" }}
								className="w-full h-full relative z-10"
								size="small"
								onBlur={() => {
									setEditInputType(null)
									setEditInputValue("")
									updateSheetRows(sheetId!, currRowId!, currColId!, editInputValue)
								}}
								value={editInputValue}
								onInput={(e) => setEditInputValue(e.currentTarget.value)}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	)
})

export default Sheet
