import styled from "styled-components";

const NavBar = styled.div`
  grid-column: 2 / 10;
  margin-top: 67px;
  display: flex;
  justify-content: space-between;
  max-height: 38px;
  padding-bottom: 24px;
  border-bottom: 1px solid #d9d9d9;
  > div {
    color: #616161;
    > * { 
    font-family: 'Source Sans Pro', regular;
    font-size: 20px;
  }
  }
`;

export default function NavBarProducts(props) {
  return (
    <NavBar>
      {props.children}
    </NavBar>
  ); 
}