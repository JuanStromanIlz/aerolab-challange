import { forwardRef, Fragment, useContext, useRef } from "react";
import styled from "styled-components";
import { UserContext } from "./UserContext";

const Success = forwardRef((props, ref) => (
  <div 
    className={props.className}
    ref={ref}
  >
    <img src="icons/check_circle.svg" alt="success"/>
  </div>
));

const StyledSuccess = styled(Success)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  visibility: hidden;
  display: grid;
  place-items: center center;
  > img {
    width: 50%;
  }
`;

const RedeemNow = (props) => (
  <div className={props.className}>
    <img src="icons/buy-white.svg" alt="buy"/>
    <div>
      {props.itemCost}<img src="icons/coin.svg" alt="buy"/>
    </div>
    <button onClick={() => props.buyItem(props.userPoints, props.itemCost, props.itemId)} 
    >
    Redeem now</button>
  </div>
);

const StyledRedeemItem = styled(RedeemNow)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'Source Sans Pro', regular;
  padding: 0 24px;
  gap: 8px;
  z-index: 1;
  background-image: linear-gradient(-180deg, rgb(10,212,250,0.6) 0%, rgb(37,187,241,0.6) 100%);
  > img:first-child {
    position: absolute;
    top: 10px; right: 6px;
    background: transparent;
    border: 0;
    border-radius: 0;
    margin: 0;
    padding: 0;
  }
  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 45%;
    font-size: 32px;
    font-family: 'Source Sans Pro', regular;
    color: #ffffff;
    gap: 4px;
    > img {
      height: 26px;
      margin-top: 2px;
    }
    
  }
  button {
    border-radius: 100px;
    border: none;
    padding: 8px auto;
    background: rgb(255,255,255, 0.5);
    min-height: 42px;
    margin-bottom: 35%;
    font-size: 20px;
    font-family: 'Source Sans Pro', regular;
    color: #616161;
    letter-spacing: -0.04px;
    line-height: 38px;
    &:hover {
      background: #ffffff;
      outline: none;
      border: 1px solid rgb(37,187,241,0.6);
    }
    &:focus {
      background: rgb(37,187,241,0.6);
      outline: none;
      border: 1px solid rgb(37,187,241,0.6);
    }
  }
`;

const CardHeader =styled.div`
  position: relative;
  height: 70%;
  border-bottom: 1px solid #d9d9d9;
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

const Card = styled.div`
  position: relative;
  aspect-ratio: 1/1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background:#ffffff;
  box-shadow: 2px 2px 4px 0 rgba(0,0,0,0.10);
  padding: 12px;
  transition: width .1s, height .1s, transform .1s;
  &:hover {
    transform: translate(0, -12px);
    box-shadow: 2px 2px 100px 0 rgba(0,0,0,0.10);
    ${StyledRedeemItem} {
      visibility: visible;
    }
    ${CardHeader} {
      border-bottom: none;
      ${BuyBlue} {
        visibility: hidden;
      }
    }
  }
  .successClass {
    visibility: visible;
    margin: 0 auto;
    background-color: transparent;
    animation: 
      stretch .5s ease-out 1 forwards alternate,
      fadeOut 3s ease-in 1 alternate;
    z-index: 2;
    @keyframes stretch {
      0% {
        transform: scale(.1);
        background-color: transparent;
        border-radius: 100%;
      }
      50% {
        background-color: rgba(103, 224, 94, 0.5);
      }
      100% {
        transform: scale(1);
        background-color: #4BB543;
      }
    } 
    @keyframes fadeOut {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  }
`;

const CardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NeedPoints = (props) => (
    <button className={props.className}>
      <span>You need {props.differenceOfPrice}</span>
      <img src="icons/coin.svg" alt="your points"/>
    </button>
);

const StyledNeedPoints = styled(NeedPoints)`
  position: absolute;
  top: 0; right: 0;
  height: 42px;
  display: flex;
  flex-direction: row;
  place-items: center;
  border-radius: 100px;
  background: rgba(97, 97, 97, 0.5);
  padding: 0 15px;
  border: none;
  &:focus {
  outline: none;
  }
  span {
    font-size: 14px;
    color: #ffffff;
    letter-spacing: -0.03px;
    text-align: right;
    margin-right: 6px;
  }
  img {
    max-height: 60%;
  }
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  > * { 
    font-family: 'Source Sans Pro', regular;
  }
`;

const Category = styled.span`
  font-size: 14px;
  color: #a3a3a3;
  letter-spacing: -0.04px;
  text-align: left;
  margin-bottom: 2.5%;
`;

const ProductName = styled.span`
  font-size: 18px;
  color: #616161;
  letter-spacing: -0.04px;
  text-align: left;
`;

export default function ItemCard(props) {
  const canUserBuy = (userPoints, productCost) => userPoints >= productCost;
  const user = useContext(UserContext);
  const calculatePrice = (userPoints, productCost) => Math.abs(productCost - userPoints);
  const success = useRef(null);
  
  function animateBuy() {
    success.current.classList.add("successClass")
    const timeout = setTimeout(() => {
      success.current.classList.remove("successClass")
    }, 3000);
    return () => clearTimeout(timeout);
  }

  function buyItem(userPoints, itemCost, itemId) {
    const request = require('request');
    const options = {
      method: 'POST',
      url: 'https://coding-challenge-api.aerolab.co/redeem',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${props.token}`
      },
      body: JSON.stringify({ productId: itemId })
    };
    request(options, function (error, response, body) {
      !error ?
        animateBuy():
        console.log(error);
    });
  }
   
  return (
    <Card>
    {canUserBuy(user.points, props.itemCost) ?
      <Fragment> 
        <StyledSuccess
          className={StyledSuccess}
          ref={success}
        />
        <StyledRedeemItem 
          className={StyledRedeemItem}
          itemCost={props.itemCost}
          itemId={props.itemId}
          userPoints={user.points}
          buyItem={buyItem}
        />
        <CardHeader>
          <BuyBlue 
            src="icons/buy-blue.svg"
          />
          <CardImg 
            src={props.itemImg.url}
          />
        </CardHeader>
      </Fragment> :
      <CardHeader>
        <StyledNeedPoints 
          className={StyledNeedPoints}
          differenceOfPrice={calculatePrice(user.points, props.itemCost)}
        />
        <CardImg 
          src={props.itemImg.url}
        />
      </CardHeader>
      } 
      <CardInfo>
        <Category>{props.itemCategory}</Category>
        <ProductName>{props.itemName}</ProductName>
      </CardInfo>
    </Card>
  );
}