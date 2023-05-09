import { RouteObject, Navigate } from "react-router-dom"
import React from "react"
const Sheet = React.lazy(() => import("@/views/sheet"))
// import { React } from "react"
const routes: RouteObject[] = [
	// {
	// 	path: "/",
	// 	element: <Navigate to={"/sheet"} />
	// },

	{
		path: "/sheet/:sheetId/:viewId",
		element: <Sheet />
	}
]

export default routes
