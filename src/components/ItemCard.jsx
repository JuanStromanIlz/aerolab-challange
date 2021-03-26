import react from "react"
import styled from "styled-components"
import {ReactComponent as IconBuyBlue} from "../img/icons/buy-blue.svg"

const Card = styled.div`
  background:#ffffff;
  box-shadow:2px 2px 4px 0 rgba(0,0,0,0.10);
  width:276px;
  height:276px;
  padding: 1rem;
`;

const CardHeader =styled.div`
  position: relative;
  height: 70%;
  place-items: center center;
`;

const CardImg = styled.img`
  width: 100%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  display: block;
`;

const Icon = styled(IconBuyBlue)`
  position: absolute;
  top: 0; right: 0;
  background: transparent;
  border: 0;
  border-radius: 0;
  margin: 0;
  padding: 0;
  
`;
const Hr = styled.hr`
  background:#d9d9d9;
  height: 1px;
`;

const CardInfo = styled.div`

`;

const Category = styled.h3`
  font-family:SourceSansPro-Regular;
  font-size:16px;
  color:#a3a3a3;
  letter-spacing:-0.04px;
  text-align:left;
`;

const ProductName = styled.h1`
  font-family:SourceSansPro-Regular;
  font-size:18px;
  color:#616161;
  letter-spacing:-0.04px;
  text-align:left;
`;

export default function ItemCard(props){
  return(
    <Card>
      <CardHeader>
        <Icon />
        <CardImg 
          src={props.ItemImg.url}
        />
      </CardHeader>
      <Hr />
      <CardInfo>
        <Category>{props.ItemCategory}</Category>
        <ProductName>{props.ItemName}</ProductName>
      </CardInfo>
    </Card>
  );
}