import React, { memo } from "react"

const SheetCard = memo((props: { actived: boolean; sheetName: string; setTabIndex: () => void }) => {
	const { actived, sheetName, setTabIndex } = props
	return (
		<div
			className={"item h-9 text-left overflow-hidden cursor-pointer hover" + (actived && " actived")}
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
		</div>
	)
})

export default SheetCard
