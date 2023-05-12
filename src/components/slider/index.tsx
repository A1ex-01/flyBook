import React, { useEffect, useState, useRef, useCallback } from "react"
import { Button, Input } from "antd"
import { WrapperBox } from "./style"
import { useNavigate } from "react-router-dom"
import useSheet from "@/hooks/useSheet"
import SheetCard from "./comps/SheetCard"
interface IProps {
	changeIsFold: () => void
	isFold: boolean
}
function SliderBox(props: IProps) {
	const { changeIsFold, isFold } = props

	const [tabIndex, setTabIndex] = useState(0)
	const { sheetArr, createSheetDispatcher, getViewArr } = useSheet()
	const [addAble, setAddAble] = useState(false)
	const inputRef = useRef<any>(null)

	const newSheet = useCallback(() => {
		setAddAble(true)
		requestIdleCallback(() => {
			inputRef.current?.focus()
		})
	}, [addAble])

	// 发送请求到服务器, 新增表
	const requestCreateSheet = useCallback(() => {
		createSheetDispatcher(inputRef.current?.input.value)
		setAddAble(false)
	}, [])

	const navigator = useNavigate()

	useEffect(() => {
		// 获取第一张表并定向到 /sheet
		const sheetId = sheetArr[0].id
		const firstViewId = getViewArr(sheetId as string)[0].id
		navigator(`/sheet/${sheetId}/${firstViewId}`)
	}, [])
	return (
		<WrapperBox className="p-2 box-border relative h-full">
			<Button
				className="absolute left-60 flex justify-center items-center"
				style={{ fontSize: "24px", left: isFold ? "245px" : "-235px", transition: "left .5s" }}
				icon={<i className="iconfont icon-arrow-right-bold" onClick={changeIsFold}></i>}
			/>
			<div className="top flex items-center mt-3 mb-3">
				<Input placeholder="搜索" prefix={<i className="iconfont icon-Star" />} />
				<Button
					type="text"
					className="flex justify-center items-center ml-2"
					icon={<i className="iconfont icon-back" style={{ fontSize: "24px" }} onClick={changeIsFold}></i>}
				/>
			</div>
			<div className="list text-gray-700">
				{sheetArr.map((sheet, index) => (
					<SheetCard
						actived={tabIndex === index}
						sheetName={sheet.name}
						key={sheet.id}
						setTabIndex={() => {
							setTabIndex(index)
							navigator(`/sheet/${sheet.id}/${getViewArr(sheet.id as string)[0].id}`)
						}}
					/>
				))}
				{addAble && <Input className="my-3" placeholder={`数据表${sheetArr.length + 1}`} ref={inputRef} onBlur={requestCreateSheet} />}
			</div>
			{/* 新建 */}
			<div
				style={{ borderTop: "1px solid #ccc", width: "calc(100% - 16px)" }}
				className="flex flex-col items-start absolute bottom-0 py-4 border-t-2"
			>
				<span className="text-sm" style={{ color: "#666" }}>
					新建
				</span>
				<div className="h-9 flex justify-start items-center cursor-pointer hover w-full rounded-md" onClick={newSheet}>
					<i className="iconfont icon-Star mr-2" style={{ color: "#7f3bf5" }}></i>
					新建数据表
				</div>
				<div className="h-9 flex justify-start items-center cursor-pointer hover w-full rounded-md">
					<i className="iconfont icon-Star mr-2" style={{ color: "#ff8800" }}></i>
					新建收集表
				</div>
				<div className="h-9 flex justify-start items-center cursor-pointer hover w-full rounded-md">
					<i className="iconfont icon-Star mr-2" style={{ color: "#598aff" }}></i>
					新建仪表盘
				</div>
			</div>
		</WrapperBox>
	)
}

export default SliderBox
