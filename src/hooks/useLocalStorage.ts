import { useState } from "react"

export const useLocalStorage = (key = "", initialValue = "") => {
	const [state, setState] = useState(() => {
		try {
			const item = localStorage.getItem(key)
			return item ? JSON.parse(item) : initialValue
		} catch (err) {
			return initialValue
		}
	})
	const setLocalStorageState = (newState: any) => {
		setState(newState)
		window.localStorage.setItem(key, JSON.stringify(newState))
	}

	return [state, setLocalStorageState]
}
