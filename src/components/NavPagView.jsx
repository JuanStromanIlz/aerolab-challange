import react from "react"
import styled from "styled-components"

const PagView = (props) => {
  function addPage() {
    props.setPage(prevValues => {
      return {
        currentPage: prevValues.currentPage + 1,
        itemsPerPage: prevValues.itemsPerPage,
        startOfItem: prevValues.startOfItem + prevValues.itemsPerPage
      }
    });
  }

  function subPage() {
    props.setPage(prevValues => {
      return {
        currentPage: prevValues.currentPage - 1,
        itemsPerPage: prevValues.itemsPerPage,
        startOfItem: prevValues.startOfItem - prevValues.itemsPerPage
      }
    });
  }

  return (
    <div className={props.className}>
      <div className={`${props.pages.startOfItem <= 0 && "hidden" }`}>
        <button onClick={() => {subPage()}}>
          <img src="icons/arrow-left.svg" alt="previus page"/>
        </button>
      </div>
      <div className={`${props.pages.startOfItem * 2 === props.products.length && "hidden"}`}>
        <button onClick={() => {addPage()}}>
          <img src="icons/arrow-right.svg" alt="next page"/>
        </button>
      </div>
      
    </div>
  );
}

const StyledPagView = styled(PagView)`
  flex-grow: 1;
  display:flex;
  flex-direction:row;
  justify-content:flex-end;
  gap: 4px;
  > div {
    aspect-ratio: 1/1;
    display: grid;
    place-items: center;
    > button {
      background:transparent;
      border:none;
      border-radius:100px;
      padding:0;
      :focus {
        outline:none;
      }
      > img {
        display: block;
        max-width: 100%;
        height: auto;
      }
    }
  }
  .hidden {
    visibility: hidden;
  }
`;

export default function NavPagView(props) {
  return (
    <StyledPagView 
      className={StyledPagView}
      setPage={props.setPage}
      products={props.products}
      pages={props.pages}
    />
  );
}