import { Button } from "antd"
import React from "react"
function Left() {
	return (
		<div className="flex" style={{ height: "65px", lineHeight: "30px", color: "#252b32" }}>
			<div className="back" style={{ lineHeight: "65px" }}>
				<i className="iconfont icon-back ant-btn" style={{ fontSize: "30px" }}></i>
			</div>
			<div className="content flex flex-col justify-center text-left">
				<div className="title" style={{ height: "22px" }}>
					<span className="text-base">飞书项目模板</span>
					<i className="iconfont icon-Star ml-2 ant-btn"></i>
				</div>
				<div className="tag text-gray-700" style={{ color: "#817d7b" }}>
					<Button type="text" icon={<i className="iconfont icon-wenjianjia ant-btn"></i>} />
					<span>我的空间 | 最近修改：20分钟前</span>
				</div>
			</div>
		</div>
	)
}

export default Left
