import { forwardRef, Fragment, useRef, useState } from "react";
import styled from "styled-components";
import Header from "./Header";

const StyledCont = styled.div`
  grid-column: 2 / 10;
  margin-top: 14px;
  display: grid;
  place-items: center center;
  .successAddClass {
    > div {
      animation: 
      pulseIn 3s ease 1 none,
      pulseOut 2s ease-in 1 none;
      @keyframes pulseIn {
        0% {
          background-color: transparent;
        }
        100% {
          background-color: #fff1b3;
        }
      }
      @keyframes pulseOut {
        0% {
          background-color: #fff1b3;
        }
        100% {
          background-color: transparent;
        }
      }
    }
  }
`;

const PointsForm = forwardRef((props, ref) => (
  <div className={props.className} ref={ref}>
    <div>
      <div>
        <h3>Need points ?</h3>
        <p>Load some more!</p>
      </div>
      <div>
        <div className="money">
          <img src="icons/coin.svg" alt="load points"/>
        </div>
        <div className="form">
          <form onSubmit={(e) => props.chargePoints(e)}>
            {props.options.map(opt => 
              <div
                key={opt.key} 
              >
                <span>{opt.value}</span>
                <input
                  onChange={() => props.setChecked(opt.value)} 
                  type="checkbox" 
                  checked={opt.value === props.checked} 
                  name={opt.value} 
                />
              </div>
            )}
            <button type="submit"><span>Add points</span></button>
          </form>
        </div>         
      </div>
    </div>
  </div>
));

const StyledPointsForm = styled(PointsForm)`
  > div {
    padding: .5em 1em;
    background:#ffffff;
    box-shadow:2px 2px 4px 0 rgba(0,0,0,0.10);
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    > div:first-child {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      > h3 {
      font-family: 'Source Sans Pro', bold;
      border-bottom: 1px solid #a3a3a3;
      margin: 0;
      padding: 1em .5em .2em 0;
      font-size: 20px;
      color: #333333;
      }
      > p {
        font-family: 'Source Sans Pro', regular;
        margin: 0;
        padding: .1em .5em 1em 0;
        font-size: 16px;
      }
    }
    > div:last-child {
      display: flex;
      gap: 8px;
      width: 100%;
      .money {
        display: grid;
        place-items: center center;
        > img {
          height: 100%;
        }
        @media (max-width: 568px) {
          display: none;
        }
      }
      .form {
        div {
          display: flex;
          flex-direction: row;
          gap: 8px;
          padding: 1em 0;
          > span {
            font-family: 'Source Sans Pro', regular;
            font-size: 16px;
          }
        }
        button {
          margin: 0 1em .5em 1em;
          padding: .5em 1em;
          width: fit-content;
          border-radius:100px;
          border:none;
          font-size:110%;
          :hover {
            background: #fff1b3;
            outline: none;
            span {
              color: #333333;
            }
          }
          :focus {
            background: #fff1b3;
            outline: none;
            span {
              color: #333333;
            }
          }
        }
      }
    }
  }
`;

export default function AddPoints(props) {
  const [checked, setChecked] = useState("");
  const options = [
    {key: 1, value: 1000},
    {key: 2, value: 5000},
    {key: 3, value: 7500}
  ];
  const successAdd = useRef("");

  function successAnimation() {
    successAdd.current.classList.add("successAddClass")
    const timeout = setTimeout(() => {
      successAdd.current.classList.remove("successAddClass")
    }, 1500);
    return () => clearTimeout(timeout);
  }

  function loadPoints(e) {
    e.preventDefault();
    const request = require('request');
    const options = {
      method: 'POST',
      url: `https://coding-challenge-api.aerolab.co/user/points`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${props.token}`
      },
      body: JSON.stringify({ amount: checked === "" ? 1000 : checked })
    };
    request(options, function (error, response, body) {
      !error ?
        successAnimation():
        console.log(error);
    });
  }

  return (
    <Fragment>
      <Header />
      <StyledCont>
        <StyledPointsForm 
          className={StyledPointsForm}
          ref={successAdd}
          chargePoints={loadPoints}
          options={options}
          checked={checked}
          setChecked={setChecked}
        />
      </StyledCont>
    </Fragment>
  );
}