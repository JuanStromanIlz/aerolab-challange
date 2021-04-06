import { cloneElement } from "react";
import styled from "styled-components";

const List = (props) => {
  const pagView = props.products.slice(props.pages.startOfItem, 
    props.pages.itemsPerPage * props.pages.currentPage
  );
  
  return (
    <div className={props.className}>
      {pagView.map(item => 
        cloneElement(props.children,
          {
            key: Math.random(), 
            itemImg: item.img, 
            itemId: item._id, 
            itemName: item.name, 
            itemCost:item.cost, 
            itemCategory: item.category, 
            token: props.token
          }
        ) 
      )}
    </div>
  );    
}

const StyledList = styled(List)`
  grid-column: 2 / 10;
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  margin: 0;
  padding: 3.4em 0 0 0;
`;

export default function ProductsList(props) {

  return (
    <StyledList
        className={StyledList}
        products={props.products}
        pages={props.pages}
        token={props.token}
      >
      {props.children}
    </StyledList>
  );
}