import styled from "styled-components"

const Card = styled.div`
  aspect-ratio: 1/1;
  display:flex;
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

export default function ItemCard(props) {
  return (
    <Card>
      <CardHeader>
        <CardImg 
          src={props.itemImg.url}
        />
      </CardHeader>
      <CardInfo>
        <Category>{props.itemCategory}</Category>
        <ProductName>{props.itemName}</ProductName>
      </CardInfo>
    </Card>
  );
}