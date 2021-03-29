import react, {Fragment, useEffect, useState} from "react"
import styled from 'styled-components'
import ItemCard from './ItemCard'
import NavBarProducts from "./NavBarProducts"

const HomeProducts = styled.div`
  margin: auto;
`;

const StyledList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2.4em;
  margin: 0;
  padding-top: 3.4em;
`;

export default function ProductsView(props) {
  const [products, setProducts] = useState({
    clean: [],
    filtered: []
  });
  const [pages, setPage] = useState({
    currentPage: 1,
    itemsPerPage: 16,
    startOfItem: 0
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
    setProducts({clean: data, filtered: data});
  }

  useEffect(() => {
    loadProducts()
  }, []);

  function paginate(list) {
    const pagView = list.slice(pages.startOfItem, pages.itemsPerPage * pages.currentPage);
    console.log(pagView)
    setProducts(prevValues => {
      return {
        clean: prevValues.clean,
        filtered: pagView
      }
    });
  }

  return(
    <HomeProducts>
      <NavBarProducts
        products={products}
        pages={pages}
        setPage={setPage}
        paginate={paginate}
      />
      <StyledList>
      {products.filtered.map(item => 
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
    </HomeProducts>
  );
}

