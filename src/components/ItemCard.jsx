import react from "react"
import styled from "styled-components"
import breakpoint from '../commons/breakpoints';

const Card = styled.div`
  aspect-ratio: 1/1;
  display:flex;
  ${'' /* min-height: 200px;
  min-width: 200px; */}
  ${'' /* max-width: 210px; */}
  flex-direction:column;
  justify-content: space-between;
  background:#ffffff;
  box-shadow:2px 2px 4px 0 rgba(0,0,0,0.10);
  padding: 12px;
`;

const CardHeader =styled.div`
  position: relative;
  height: 70%;
  border-bottom: 1px solid #d9d9d9;
`;

const CardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BuyBlue = styled.img`
  position: absolute;
  top: 0; right: 0;
  background: transparent;
  border: 0;
  border-radius: 0;
  margin: 0;
  padding: 0;
`;

const CardInfo = styled.div`
  display:flex;
  flex-direction:column;
`;

const Category = styled.span`
  font-family:SourceSansPro-Regular;
  font-size:90%;
  color:#a3a3a3;
  letter-spacing:-0.04px;
  text-align:left;
  margin-bottom: 2.5%;
`;

const ProductName = styled.span`
  font-family:SourceSansPro-Regular;
  font-size:120%;
  color:#616161;
  letter-spacing:-0.04px;
  text-align:left;
`;

export default function ItemCard(props){
  return(
    <Card>
      <CardHeader>
        <BuyBlue 
          src="icons/buy-blue.svg"
        />
        <CardImg 
          src={props.ItemImg.url}
        />
      </CardHeader>
      <CardInfo>
        <Category>{props.ItemCategory}</Category>
        <ProductName>{props.ItemName}</ProductName>
      </CardInfo>
    </Card>
  );
}