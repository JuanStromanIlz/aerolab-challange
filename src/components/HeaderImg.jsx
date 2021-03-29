import react from "react"
import styled from "styled-components"

const StyledHeaderImg = styled.div`
  grid-column: 1 / 11;
  min-height:412px;
  ${'' /* padding: 284px 0 48px 132px; */}
  margin-bottom: 67px;
  > h1 {
    position: absolute;
    bottom: 35%;
    left: 10%;
    height: 80px;
    font-size: 64px;
    margin: 0;
    color:#ffffff;
    text-align:left;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default function HeaderImg() {
  return(
    <StyledHeaderImg>
      <StyledImg 
        src="header-x1.png"
      />
      <h1>Electronics</h1>
    </StyledHeaderImg>
  );
}