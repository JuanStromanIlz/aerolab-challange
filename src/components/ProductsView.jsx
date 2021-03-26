import react, {Fragment, useEffect, useState} from "react"
import styled from 'styled-components'
import ItemCard from './ItemCard'

const NavBarList = styled.div`

`;

const StyledList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`;

export default function ProductsView(props) {
  const [products, setProducts] = useState([]);

  const [pages, setPage] = useState({
    currentPage: 1,
    itemsPerPage: 16
  });
  
  const loadProducts = async () => {
    const response = await fetch("https://coding-challenge-api.aerolab.co/products",
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${props.token}`
        }
      });
    const data = await response.json();
    setProducts(data);
  }

  useEffect(() => {
    loadProducts()
  }, []);

  function addPage(){
    setPage(prevValues => {
      return {
        currentPage: prevValues.currentPage + 1,
        itemsPerPage: prevValues.itemsPerPage
      }
    });
  }

  function subPage(){
    setPage(prevValues => {
      return {
        currentPage: prevValues.currentPage - 1,
        itemsPerPage: prevValues.itemsPerPage
      }
    });
  }
  // function paginate(data) {
  //   const productsPerPag = 16;
  //   const result = new Array(Math.ceil(data.length / productsPerPag))
  //     .fill()
  //     .map(_ => data.splice(0, productsPerPag));
  //   return result; 
  // }

  return(
    <Fragment>
      <NavBarList>
        <button onClick={() => {addPage()}}>+</button>
        <button onClick={() => {subPage()}}>-</button>
      </NavBarList>
      <StyledList>
        {products.map(item => 
          <ItemCard
            key={item.name}
            ItemImg={item.img}
            ItemId={item._id}
            ItemName={item.name}
            ItemCost={item.cost}
            ItemCategory={item.category}
          /> 
        )} 
      </StyledList>
    </Fragment>
  );
}

