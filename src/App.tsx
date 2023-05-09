import { Button } from "antd"
import React from "react"
import Layout from "./views/LayoutBox"
import store from "./store"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import routes from "./router"
function App() {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<Layout />
			</Provider>
		</BrowserRouter>
	)
}

export default App
