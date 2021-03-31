import react from "react"
import styled from "styled-components"

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

  function handleClick(pagOption) {
    switch (pagOption) {
      case 1:
        console.log("caso 1 sin definir")
        props.setPage(prevValues => {
          return {
            currentPage: 1,
            itemsPerPage: prevValues.itemsPerPage,
            startOfItem: 0
          }
        });
        break;
      case 2:
        const descPrice = props.products.sort(orderByPrice("cost", "asc"));
        props.setProducts(descPrice);
        props.setPage(prevValues => {
          return {
            currentPage: 1,
            itemsPerPage: prevValues.itemsPerPage,
            startOfItem: 0
          }
        });
        break;
      case 3:
        const ascPrice = props.products.sort(orderByPrice("cost", "desc"));
        props.setProducts(ascPrice);
        props.setPage(prevValues => {
          return {
            currentPage: 1,
            itemsPerPage: prevValues.itemsPerPage,
            startOfItem: 0
          }
        });
        break;
    
      default:
        break;
    }
  }

  return (
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
}

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
        background:#0ad4fa;
        outline:none;
        span {
          color:#ffffff;
        }
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

export default function NavSearch(props) {
  return (
    <StyledSearch 
      products={props.products}
      setProducts={props.setProducts}
      setPage={props.setPage}
    />
  );
}
