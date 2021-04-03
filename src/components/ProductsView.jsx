import { Fragment, useEffect, useState } from "react"
import BuyCard from './BuyCard'
import NavBarProducts from "./NavBarProducts"
import NavCounter from "./NavCounter"
import NavPagView from "./NavPagView"
import NavSearch from "./NavSearch"
import HeaderImg from "./HeaderImg"
import Header from "./Header"
import ProductsList from "./ProductsList"

export default function ProductsView(props) {
  const [products, setProducts] = useState([]);
  const [pages, setPage] = useState({
    currentPage: 1,
    itemsPerPage: 16,
    startOfItem: 0
  });

  function loadProducts() {
    const request = require('request');
    const options = {
      method: 'GET',
      url: `${props.url}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${props.token}`
      }
    };
    request(options, function (error, response, body) {
      // console.log('Status:', response.statusCode);
      // console.log('Headers:', JSON.stringify(response.headers));
      // console.log('Response:', body);
      const productsData = JSON.parse(body);
      setProducts(productsData);
    });
  }

  useEffect(() => {
    loadProducts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  

  return (
    <Fragment>
      <Header 
        token={props.token}
      />
      <HeaderImg
        title="Electronics"
      />
      <NavBarProducts>
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
      </NavBarProducts>
      <ProductsList
        products={products}
        pages={pages}
        token={props.token}
      >
        <BuyCard />
      </ProductsList>
      <NavBarProducts>
        <NavCounter 
          pages={pages}
          products={products}
        />
        <NavPagView 
          setPage={setPage}
          products={products}
          pages={pages}
        />
      </NavBarProducts>
    </Fragment>
  );
}

