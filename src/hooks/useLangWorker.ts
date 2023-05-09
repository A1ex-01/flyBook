import { useMySelect } from "@/store"
import { Lang, Theme, changeCurrLang } from "@/store/modules/home"
import { useDispatch } from "react-redux/es/hooks/useDispatch"
import { useTranslation } from "react-i18next"
export function useLangWorker() {
	const { i18n } = useTranslation()
	const { lang } = useMySelect((state) => ({
		lang: state.home.lang
	}))
	const dispatch = useDispatch()
	const changeLang = (lang: Lang) => {
		i18n.changeLanguage(lang)
		dispatch(changeCurrLang(lang))
	}
	return { lang, changeLang }
}
