import { useMySelect } from "@/store"
import { Theme, changeCurrTheme } from "@/store/modules/home"
import { useDispatch } from "react-redux/es/hooks/useDispatch"

export function useThemeWorker() {
	const { theme } = useMySelect((state) => ({
		theme: state.home.theme
	}))
	const dispatch = useDispatch()
	const changeTheme = (theme: Theme) => {
		dispatch(changeCurrTheme(theme))
	}
	return { theme, changeTheme }
}
