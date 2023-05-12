import {
	IconAlarm,
	IconCircle,
	IconCirclePlus,
	IconClipboardData,
	IconFilterCog,
	IconLineHeight,
	IconScreenShare,
	IconSettings,
	IconSortAZ,
	IconUsersGroup
} from "@tabler/icons-react"
import React, { Key } from "react"
interface Tool {
	id: Key
	name: string
	icon: any
}
export const toolTabs: Tool[][] = [
	[{ id: "1", name: "添加记录", icon: <IconCirclePlus size={16} /> }],
	[
		{ id: "2", name: "字段配置", icon: <IconSettings size={16} /> },
		{ id: "3", name: "筛选", icon: <IconFilterCog size={16} /> },
		{ id: "4", name: "分组", icon: <IconUsersGroup size={16} /> },
		{ id: "5", name: "排序", icon: <IconSortAZ size={16} /> },
		{ id: "6", name: "行高", icon: <IconLineHeight size={16} /> }
	],
	[
		{ id: "7", name: "提醒", icon: <IconAlarm size={16} /> },
		{ id: "8", name: "生成表单", icon: <IconClipboardData size={16} /> },
		{ id: "9", name: "分享视图", icon: <IconScreenShare size={16} /> }
	]
]
