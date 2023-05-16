import { Button, App as AppAntd } from "antd"
import React from "react"
import Layout from "./views/LayoutBox"
import store from "./store"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import routes from "./router"
import { WithAntd } from "@/common/WithAntd"

function App() {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<AppAntd>
					<Layout />
					<WithAntd />
				</AppAntd>
			</Provider>
		</BrowserRouter>
	)
}

export default App
