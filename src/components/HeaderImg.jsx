import styled from "styled-components";

const StyledHeaderImg = styled.div`
  grid-column: 1 / 11;
  background-image: url("header-x1.png"); 
  background-position: center center; 
  background-size: 100% 100%; 
  height: 450px;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  position: relative;
  > h1 {
    font-family: 'Source Sans Pro', bold;
    position: absolute;
    bottom: 0;
    left: 0;
    grid-column: 2 / 5;
    font-size: 64px;
    color: #ffffff;
  }
  @media (max-width: 568px) {
    display: none;
  }
`;

export default function HeaderImg(props) {
  return (
    <StyledHeaderImg>
      <h1>{props.title}</h1>
    </StyledHeaderImg>
  );
}