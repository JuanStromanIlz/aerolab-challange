import react from "react"
import styled from "styled-components"

const Counter = (props) => (
  <div className={props.className}>
    <span>{props.pages.currentPage * props.pages.itemsPerPage} of {props.products.length} products</span>
  </div>
);

const StyledCounter = styled(Counter)`
  flex-grow: 1;
  display: flex;
  place-items: center;
  span {
    font-size:110%;
    color:#616161;
    letter-spacing:-0.15px;
    text-align:left;
    margin:0;
  }
`;

export default function NavCounter(props) { 
  return (
    <StyledCounter
      className={StyledCounter}
      pages={props.pages}
      products={props.products}
    />
  );
}