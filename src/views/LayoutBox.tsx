import React, { useCallback, useEffect, useState } from "react"
import { Layout, Button, ConfigProvider, theme as antdTheme } from "antd"
import HeaderBox from "@/components/header"
import SliderBox from "@/components/slider/index"
import { useTranslation } from "react-i18next"
const { Content } = Layout
import "antd/es/theme/themes/dark/index.js"
import { useMySelect } from "@/store"
import { changeCurrLang, changeCurrTheme, initCurrStatus } from "@/store/modules/home"
import { useRoutes } from "react-router-dom"
import { useDispatch } from "react-redux"
import Home from "./sheet"
import routes from "@/router"
const headerStyle: React.CSSProperties = {
	textAlign: "center",
	height: 64,
	paddingInline: 50,
	borderBottom: "1px solid #cccccca7",
	minWidth: 900
}

const contentStyle: React.CSSProperties = {
	textAlign: "center",
	height: "calc(100vh - 64px)",
	padding: 10,
	boxSizing: "border-box"
}

const siderStyle: React.CSSProperties = {
	textAlign: "center",
	width: 235,
	height: "calc(100vh - 64px)",
	borderRight: "1px solid #ccc",
	transition: "transform .5s"
}
function LayoutBox() {
	const { theme, lang } = useMySelect((state) => {
		return {
			theme: state.home.theme,
			lang: state.home.lang
		}
	})
	const [isFold, setIsFold] = useState(false)

	const { i18n } = useTranslation()
	const dispatch = useDispatch()
	const changeIsFold = useCallback(() => {
		setIsFold((pre) => !pre)
	}, [setIsFold])
	useEffect(() => {
		dispatch(initCurrStatus())
		// 初始化i18n
		const lang = localStorage.getItem("lang")
		if (lang) {
			i18n.changeLanguage(lang)
		} else {
			i18n.changeLanguage("zh")
		}
	}, [])
	return (
		<ConfigProvider
			theme={{
				algorithm: theme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm
			}}
		>
			<Layout>
				<div style={headerStyle}>
					<HeaderBox />
				</div>
				<Layout className="flex-row">
					<div style={{ ...siderStyle, transform: `translateX(${isFold ? "-100%" : "0"})` }}>
						<SliderBox changeIsFold={() => changeIsFold()} isFold={isFold} />
					</div>
					<Content style={contentStyle}>{useRoutes(routes)}</Content>
				</Layout>
			</Layout>
		</ConfigProvider>
	)
}

export default LayoutBox
