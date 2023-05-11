import React, { useEffect } from "react"
import Left from "./comp/Left"
import Right from "./comp/Right"

function HeaderBox() {
	return (
		<div className="flex justify-between">
			<div className="left">
				<Left />
			</div>
			<div className="right">
				<Right />
			</div>
		</div>
	)
}

export default HeaderBox
