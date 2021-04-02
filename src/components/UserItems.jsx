import { Fragment, useEffect, useState } from "react"
import NavBarProducts from "./NavBarProducts"
import NavCounter from "./NavCounter"
import NavPagView from "./NavPagView"
import Header from "./Header"
import ProductsList from "./ProductsList"
import ItemCard from './ItemCard'
import HeaderImg from "./HeaderImg"

export default function UserItems(props) {
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
        title="Your items"
      />
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
      <ProductsList
        products={products}
        pages={pages}
        setPage={setPage}
      >
        <ItemCard />
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