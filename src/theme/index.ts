import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import en from "./en.json"
import zh from "./zh.json"
i18next.use(initReactI18next).init({
	// the translations
	// (tip move them in a JSON file and import them,
	// or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
	resources: {
		en: {
			translation: en
		},
		zh: {
			translation: zh
		}
	},
	lng: "zh", // if you're using a language detector, do not define the lng option
	fallbackLng: "zh",

	interpolation: {
		escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
	}
})
