import useSheet from "@/hooks/useSheet"
import { IconDots, IconDotsVertical } from "@tabler/icons-react"
import { Button, Input, message, Popover } from "antd"
import React, { Key, memo, useCallback, useState, FocusEvent } from "react"

const SheetCard = memo((props: { actived: boolean; sheetName: string; setTabIndex: () => void; sheetId: string }) => {
	const { actived, sheetName, setTabIndex, sheetId } = props
	// input状态
	const [isSHow, setIsSHow] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const { updateSheetNameBySheetId } = useSheet()
	const updateSheetName = useCallback((e: FocusEvent<HTMLInputElement, Element>) => {
		updateSheetNameBySheetId(sheetId, e.target.value)
		setIsSHow(false)
		setIsOpen(false)
	}, [])
	return (
		<div
			className={"item h-9 flex items-center text-left overflow-hidden cursor-pointer hover relative" + (actived && " actived")}
			onClick={() => setTabIndex()}
			style={{
				lineHeight: "36px",
				paddingLeft: "6px",
				borderRadius: "6px",
				boxSizing: "border-box"
			}}
		>
			<i className="iconfont icon-Star mr-2"></i>
			<span>{sheetName}</span>

			<Popover
				placement="bottomRight"
				content={
					<Button
						onClick={() => {
							setIsSHow(true)
							setIsOpen(false)
						}}
						size="small"
						type="text"
					>
						重命名
					</Button>
				}
				open={isOpen}
				trigger="click"
			>
				<IconDotsVertical onClick={() => setIsOpen(true)} style={{ marginLeft: "auto", marginRight: "10px" }} size={16} />
			</Popover>
			{isSHow && <Input onBlur={updateSheetName} className="absolute" style={{ width: "calc(100% - 30px)", right: "5px" }} />}
		</div>
	)
})

export default SheetCard
