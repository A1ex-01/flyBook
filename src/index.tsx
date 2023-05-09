import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "normalize.css"
import "./index.css"
import "@/assets/css/icon.css"
import "@/assets/css/common.css"
import "@/theme/index"
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(<App />)
