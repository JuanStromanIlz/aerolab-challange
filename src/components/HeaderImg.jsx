import styled from "styled-components"

const StyledHeaderImg = styled.div`
  grid-column: 1 / 11;
  margin-bottom: 67px;
  display: grid;
  @media (max-width: 568px) {
    display: none;
  }
  > div {
    width: 60%;
    padding: 0 9vw;
    > h1 {
      font-size: 400%;
      color:#ffffff;
      text-align:left;
    }
  } 
  
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default function HeaderImg(props) {
  return(
    <StyledHeaderImg>
      <StyledImg 
        src="header-x1.png"
      />
      <div>
        <h1>{props.title}</h1>
      </div>
    </StyledHeaderImg>
  );
}