import react from "react"
import styled from "styled-components"

const StyledHeaderImg = styled.div`
  max-height:412px;
  background: url("header-x1.png") no-repeat center;
  background-size: cover;
  padding: 284px 0 48px 132px;
  margin-bottom: 67px;
  > h1 {
    height: 80px;
    font-size: 64px;
    margin: 0;
    color:#ffffff;
    text-align:left;
  }
`;

const StyledImg = styled.img`
  object-fit: fill;
`;

export default function HeaderImg() {
  return(
    <StyledHeaderImg>
      {/* <StyledImg 
        src="header-x1.png"
      /> */}
      <h1>Electronics</h1>
    </StyledHeaderImg>
  );
}