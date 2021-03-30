import react from "react"
import styled from "styled-components"

const NavBar = styled.div`
  grid-column: 2 / 10;
  display:flex;
  justify-content: space-between;
  max-height:38px;
  padding-bottom:24px;
  border-bottom:1px solid #d9d9d9;
  > div {
    color:#616161;
  }
`;

const Counter = (props) => (
  <div className={props.className}>
    <span>{props.pages.startOfItem} of {props.products.length} products</span>
  </div>
);

const StyledCount = styled(Counter)`
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

const Search = (props) => {
  function orderByPrice(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  function handleClick(pagOption){
    switch (pagOption) {
      case 1:
        console.log("caso 1 sin definir")
        break;
      case 2:
        const descPrice = props.products.sort(orderByPrice("cost", "asc"));
        props.setProducts(descPrice);
        break;
      case 3:
        const ascPrice = props.products.sort(orderByPrice("cost", "desc"));
        props.setProducts(ascPrice);
        break;
    
      default:
        break;
    }
  }

  return(
    <div className={props.className}>
      <div>
        <span>Sort by:</span>
      </div>
      <div>
        <button onClick={() => {handleClick(1)}}><span>Most recent</span></button>
      </div>
      <div>
        <button onClick={() => {handleClick(2)}}><span>Lower price</span></button>
      </div>
      <div>
        <button onClick={() => {handleClick(3)}}><span>Highest price</span></button>
      </div>
    </div>
  );

};

const PagView = (props) => {
  function addPage(){
    props.setPage(prevValues => {
      return {
        currentPage: prevValues.currentPage + 1,
        itemsPerPage: prevValues.itemsPerPage,
        startOfItem: prevValues.startOfItem + prevValues.itemsPerPage
      }
    });
  }

  function subPage(){
    props.setPage(prevValues => {
      return {
        currentPage: prevValues.currentPage - 1,
        itemsPerPage: prevValues.itemsPerPage,
        startOfItem: prevValues.startOfItem - prevValues.itemsPerPage
      }
    });
  }

  return(
    <div className={props.className}>
      <div className={`${props.pages.startOfItem <= 0 && "hidden" }`}>
        <button onClick={() => {subPage()}}>
          <img src="icons/arrow-left.svg" alt="previus page"/>
        </button>
      </div>
      <div className={`${props.pages.startOfItem >= props.products.length && "hidden" }`}>
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
`;

const StyledSearch = styled(Search)`
  flex-grow: 2;
  display:flex;
  flex-wrap: wrap;
  place-items:center;
  > div {
    flex-grow: 1;
    height: 100%;
    display: grid;
    place-items: center;
    > span {
      color:#616161;
      letter-spacing:-0.15px;
      text-align:left;
      margin:0;
      font-size:110%;
    }
    > button {
      height: 100%;
      padding: 0 24px;
      border-radius:100px;
      border:none;
      font-size:110%;
      :focus {
        outline:none;
      }
      :active {
        background:#0ad4fa;
        span {
          color:#ffffff;
        }
      }
    }
  }
`;

export default function NavBarProducts(props){

  return(
    <NavBar>
      <StyledCount
        className={StyledCount}
        pages={props.pages}
        products={props.products}
      />
      <StyledSearch
        className={StyledSearch}
        products={props.products}
        setProducts={props.setProducts}
      />
      <StyledPagView
        className={StyledPagView}
        setPage={props.setPage}
        products={props.products}
        pages={props.pages}
      />
    </NavBar>
  );
  
}