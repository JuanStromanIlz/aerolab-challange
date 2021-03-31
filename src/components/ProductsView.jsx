import {Fragment, useEffect, useState} from "react"
import styled from 'styled-components'
import ItemCard from './ItemCard'
import NavBarProducts from "./NavBarProducts"
import NavCounter from "./NavCounter";
import NavPagView from "./NavPagView";
import NavSearch from "./NavSearch";
import HeaderImg from "./HeaderImg"
import Header from "./Header";

const StyledList = styled.div`
  grid-column: 2 / 10;
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin: 0;
  padding: 3.4em 0;
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
        itemImg={item.img}
        itemId={item._id}
        itemName={item.name}
        itemCost={item.cost}
        itemCategory={item.category}
        userPoints={0}
        token={props.token}
      />
    );
  }

  return (
    <Fragment>
    <Header 
      token={props.token}
    />
    <HeaderImg/>
      <NavBarProducts
        children={
          <Fragment>
            <NavCounter 
              pages={pages}
              products={products}
            />
            <NavSearch 
              products={products}
              setProducts={setProducts}
              setPage={setPage}
            />
            <NavPagView 
              setPage={setPage}
              products={products}
              pages={pages}
            />
          </Fragment>
        }
      />
      <StyledList>
      {paginate()}
      </StyledList>
      <NavBarProducts
        children={
          <Fragment>
            <NavCounter 
              pages={pages}
              products={products}
            />
            <NavPagView 
              setPage={setPage}
              products={products}
              pages={pages}
            />
          </Fragment>
        }
      />
    </Fragment>
  );
}

