import react from "react"
import styled from "styled-components"

const StyledHeaderImg = styled.div`
  grid-column: 1 / 11;
  margin-bottom: 67px;
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
    </StyledHeaderImg>
  );
}