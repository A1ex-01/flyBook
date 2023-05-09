import React from "react"
import { Button, Space, Avatar, Popover } from "antd"
import ProfileTabs from "./ProfileTabs"
function Right() {
	return (
		<div className="flex items-center h-full">
			<Space>
				<Button type="primary" icon={<i className="iconfont icon-lock" />}>
					分享
				</Button>
				<Button icon={<i className="iconfont icon-quanxian" />}>高级权限</Button>
				<Button icon={<i className="iconfont icon-rengongzhineng" />}>自动化</Button>
				<Space>
					<Button type="text">
						<i className="iconfont icon-xiaoxizhongxin font-bold "></i>
					</Button>
					<Button type="text">
						<i className="iconfont icon-more font-bold "></i>
					</Button>
				</Space>
				<Space
					style={{
						borderLeft: "1px solid #e7e8ea",
						borderRight: "1px solid #e7e8ea",
						height: "30px",
						padding: "0 12px"
					}}
				>
					<Button type="text">
						<i className="iconfont icon-sousuo font-bold "></i>
					</Button>
					<Button type="text">
						<i className="iconfont icon-jia font-bold "></i>
					</Button>
				</Space>
				<Popover placement="bottomRight" content={<ProfileTabs />} trigger="click">
					<Avatar
						style={{
							backgroundColor: "#833dfc",
							color: "#fff",
							cursor: "pointer"
						}}
					>
						a1ex
					</Avatar>
				</Popover>
			</Space>
		</div>
	)
}

export default Right
