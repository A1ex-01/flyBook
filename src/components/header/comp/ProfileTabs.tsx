import React from "react"
import { Avatar, Button } from "antd"
import { Popover } from "antd"
import { useThemeWorker } from "@/hooks/useThemeWorker"
import { useLangWorker } from "@/hooks/useLangWorker"
import { useMySelect } from "@/store"
import { useTranslation } from "react-i18next"
export const ThemeModel = () => {
	const { theme, changeTheme } = useThemeWorker()
	const { t } = useTranslation()
	return (
		<div className="w-28 text-base">
			<Button type="text" className="w-full text-left" onClick={() => changeTheme("light")}>
				{t("浅色")}
				{theme === "light" && "√"}
			</Button>
			<Button type="text" className="w-full text-left" onClick={() => changeTheme("dark")}>
				{t("暗色")}
				{theme === "dark" && "√"}
			</Button>
		</div>
	)
}
export const LangModel = () => {
	const { lang, changeLang } = useLangWorker()
	const { t } = useTranslation()
	return (
		<div className="w-28 text-base">
			<Button type="text" className="w-full text-left" onClick={() => changeLang("zh")}>
				{t("中文")}
				{lang === "zh" && "√"}
			</Button>
			<Button type="text" className="w-full text-left" onClick={() => changeLang("en")}>
				{t("英文")}
				{lang === "en" && "√"}
			</Button>
		</div>
	)
}
function ProfileTabs() {
	const { theme } = useMySelect((state) => {
		return {
			theme: state.home.theme
		}
	})
	const { t } = useTranslation()

	return (
		<div>
			<div className="user flex p-4 w-64" style={{ borderBottom: "1px solid #ccc" }}>
				<div className="avatar">
					<Avatar size={50} className="mr-3" style={{ backgroundColor: "#833dfc", color: "#fff" }}>
						a1ex
					</Avatar>
				</div>
				<div className="desc flex flex-col">
					<div className="nickname text-2xl">a1ex</div>
					<div className="role">{t("飞书个人用户")}</div>
				</div>
			</div>
			<div className="item pl-3 pr-3" style={{ borderBottom: "1px solid #ccc" }}>
				<Popover placement="left" content={<ThemeModel />} trigger="hover">
					<div className="h-14 text-base flex justify-between  cursor-pointer" style={{ lineHeight: "56px" }}>
						<span>{t("外观")}</span>
						<span className="text-xs flex items-center" style={{ color: "#666", lineHeight: "56px" }}>
							{theme}
							<i className="iconfont icon-arrow-right-bold"></i>
						</span>
					</div>
				</Popover>
			</div>
			<div className="item pl-3 pr-3" style={{ borderBottom: "1px solid #ccc" }}>
				<Popover placement="left" content={<LangModel />} trigger="hover">
					<div className="h-14 text-base flex justify-between cursor-pointer" style={{ lineHeight: "56px" }}>
						<span>{t("语言")}</span>
						<span className="text-xs" style={{ color: "#666", lineHeight: "56px" }}>
							<i className="iconfont icon-arrow-right-bold"></i>
						</span>
					</div>
				</Popover>

				<div className="h-14 text-base flex justify-between cursor-pointer" style={{ lineHeight: "56px" }}>
					<span>{t("切换用户")}</span>
					<span className="text-xs" style={{ color: "#666", lineHeight: "56px" }}>
						<i className="iconfont icon-arrow-right-bold"></i>
					</span>
				</div>
			</div>
			<div className="item pl-3 pr-3" style={{ borderBottom: "1px solid #ccc" }}>
				<div className="h-14 text-base flex justify-between cursor-pointer" style={{ lineHeight: "56px" }}>
					<span>{t("设置")}</span>
				</div>
				<div className="h-14 text-base flex justify-between cursor-pointer" style={{ lineHeight: "56px" }}>
					<span>{t("帮助中心")}</span>
				</div>
			</div>
			<div className="item pl-3 pr-3">
				<div className="h-14 text-base flex justify-between cursor-pointer" style={{ lineHeight: "56px" }}>
					<span>{t("退出登录")}</span>
				</div>
			</div>
		</div>
	)
}

export default ProfileTabs
