import { App } from "antd"
import { MessageInstance } from "antd/es/message/interface"
export let message :MessageInstance | null = null

export const WithAntd = function () {
	const { message : antdMessage } = App.useApp()
	message = antdMessage
	return null
}
