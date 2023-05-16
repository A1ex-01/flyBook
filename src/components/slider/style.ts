import styled from "styled-components"

const WrapperBox = styled.div`
  display: flex;
	flex-direction: column;
	.actived {
		color: "#3370ff";
		background-color: #3370ff20 !important;
	}
	.hover:hover {
		background-color: #edeeee;
	}
	.list{
		flex: 1;
	}
`

export { WrapperBox }
