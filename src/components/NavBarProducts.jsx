import react from "react"
import styled from "styled-components"

const NavBar = styled.div`
  display:flex;
  flex-direction:row;
  align-items:center;
  height:48px;
  padding-bottom:24px;
  border-bottom:1px solid #d9d9d9;
  > div {
    align-self:stretch;
    color:#616161;
  }
`;

const Counter = (props) => (
  <div className={props.className}>
    <span>{props.pages.startOfItem} of {props.products.filtered.length} products</span>
  </div>
);

const StyledCount = styled(Counter)`
  padding-right:24px;
  border-right:1px solid #d9d9d9;
  span {
    font-size:24px;
    color:#616161;
    letter-spacing:-0.15px;
    line-height:48px;
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
        props.paginate(props.products.clean)
        break;
      case 2:
        const descPrice = props.products.clean.sort(orderByPrice("cost", "asc"));
        props.paginate(descPrice)
        break;
      case 3:
        const ascPrice = props.products.clean.sort(orderByPrice("cost", "desc"));
        props.paginate(ascPrice)
        break;
    
      default:
        break;
    }
  }

  function categories(products){
    const productsCategory = products.map(item => item.category);
    const cleanCategories = [...new Set(productsCategory)];
    return cleanCategories;
  }

  return(
    <div className={props.className}>
      <span>Sort by:</span>
      <button onClick={() => {handleClick(1)}}><span>Most recent</span></button>
      <button onClick={() => {handleClick(2)}}><span>Lower price</span></button>
      <button onClick={() => {handleClick(3)}}><span>Highest price</span></button>
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
      <button onClick={() => {subPage()}}>
        <img src="icons/arrow-left.svg" />
      </button>
      <button onClick={() => {addPage()}}>
        <img src="icons/arrow-right.svg" />
      </button>
    </div>
  );
}

const StyledPagView = styled(PagView)`
  display:flex;
  flex-direction:row;
  position:absolute;
  right:0;
  button {
    background:transparent;
    border:none;
    border-radius:100px;
    padding:0;
  }
  > button:last-child {
    margin-left:12px;
  }
  button:focus {
  outline:none;
  }
`;

const StyledSearch = styled(Search)`
  display:flex;
  flex-direction:row;
  place-items:center;
  span {
    margin:0;
    font-size:24px;
    color:#616161;
    letter-spacing:-0.15px;
    line-height:48px;
    text-align:left;
  }
  > span:first-child {
    margin-left:24px;
  }
  button {
    margin-left: 24px;
    padding: 0 24px;
    border-radius:100px;
    border:none;
  }
  button:focus {
  outline:none;
  }
  button:active {
    background:#0ad4fa;
    span {
      color:#ffffff;
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
        paginate={props.paginate}
      />
      <StyledPagView
        className={StyledPagView}
        setPage={props.setPage}
      />
    </NavBar>
  );
  
}