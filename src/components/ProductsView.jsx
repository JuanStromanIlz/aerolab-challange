import react, {Fragment, useEffect, useState} from "react"
import styled from 'styled-components'
import ItemCard from './ItemCard'
import NavBarProducts from "./NavBarProducts"

const StyledList = styled.div`
  grid-column: 2 / 10;
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin: 0;
  padding-top: 3.4em;
`;

export default function ProductsView(props) {
  const [products, setProducts] = useState([]);
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
    setProducts(data);
  }

  useEffect(() => {
    loadProducts()
  }, []);
  
  function handleFiltered(list){
    setProducts([...list]);
  }

  function paginate() {
    const pagView = products.slice(pages.startOfItem, pages.itemsPerPage * pages.currentPage);
    return pagView.map(item => 
      <ItemCard
        key={item.name}
        ItemImg={item.img}
        ItemId={item._id}
        ItemName={item.name}
        ItemCost={item.cost}
        ItemCategory={item.category}
        userPoints={2000}
      />
    );
  }

  return(
    <Fragment>
      <NavBarProducts
        products={products}
        setProducts={handleFiltered}
        pages={pages}
        setPage={setPage}
      />
      <StyledList>
      {paginate()}
      </StyledList>
    </Fragment>
  );
}

