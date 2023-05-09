import { configureStore } from "@reduxjs/toolkit"
import homeSlice from "./modules/home"
import { useSelector } from "react-redux/es/hooks/useSelector"
import sheetSlice from "./modules/sheetsSlice"
type IRoot = ReturnType<typeof store.getState>
// export const useMySelect: TypedUseSelectorHook<IRoot> = useSelector
export const useMySelect: <T>(fn: (state: IRoot) => T) => T = useSelector
const store = configureStore({
	reducer: {
		home: homeSlice,
		sheet: sheetSlice
	}
})

export default store
