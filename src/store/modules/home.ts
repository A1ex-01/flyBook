import { createSlice } from "@reduxjs/toolkit"
export type Theme = "light" | "dark"
export type Lang = "zh" | "en"
interface IState {
	theme: Theme
	lang: Lang
}
const state: IState = {
	theme: "light",
	lang: "zh"
}
const homeSlice = createSlice({
	name: "home",
	initialState: state,
	reducers: {
		changeCurrTheme(state, { payload }: { payload: Theme }) {
			localStorage.setItem("theme", payload)
			state.theme = payload
		},
		changeCurrLang(state, { payload }: { payload: Lang }) {
			localStorage.setItem("lang", payload)
			state.lang = payload
		},
		initCurrStatus(state) {
			const theme = localStorage.getItem("theme")
			if (theme) {
				state.theme = theme as Theme
			} else {
				localStorage.setItem("theme", "light")
				state.theme = "light"
			}
			const lang = localStorage.getItem("lang")
			if (lang) {
				state.lang = lang as Lang
			} else {
				localStorage.setItem("lang", "zh")
				state.lang = "zh"
			}
		}
	}
})

export default homeSlice.reducer
export const { changeCurrTheme, changeCurrLang, initCurrStatus } = homeSlice.actions
