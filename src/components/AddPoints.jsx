import { Fragment, useState } from "react";
import styled from "styled-components"
import Header from "./Header"

const PointsForm = (props) => {
  function selectOnlyThis(value) {
    props.setChecked(value)
  }

  return (
      <form onSubmit={() => props.chargePoints()} className={props.className}>
      <h3>Need points?</h3>
        {props.options.map(opt => 
          <div>
            <span>{opt.value}</span>
            <input 
              key={opt.key} 
              onChange={() => selectOnlyThis(opt.value)} 
              type="checkbox" 
              checked={opt.value === props.checked} 
              name={opt.value} 
            />
          </div>
        )}
        <button type="submit"><span>Add points</span></button>
      </form>
  );
}

const StyledPointsForm = styled(PointsForm)`
  grid-column: 2 / 10;
  margin-top: 14px;
  padding: 1em;
  display: flex;
  flex-direction: column;
  height: min-content;
  background:#ffffff;
  box-shadow:2px 2px 4px 0 rgba(0,0,0,0.10);
  > h3 {
    text-align: center;
    margin: 0 12px 12px 12px;
    border-bottom: 1px solid #a3a3a3;
    color:#616161;
  }
  > div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 8px;
    margin-bottom: 8px;
    > span {
      font-size: 18px;
    }
  }
  button {
    margin: auto;
    padding: 8px 24px;
    border-radius:100px;
    border:none;
    font-size:110%;
    :hover {
      background:#0ad4fa;
      outline:none;
      span {
        color:#ffffff;
      }
    }
    :active {
      background:#0ad4fa;
      span {
        color:#ffffff;
      }
    }
  }
`;
export default function AddPoints(props) {
  const [checked, setChecked] = useState("");
  const [options, setOptions] = useState([
    {key: 1, value: 1000},
    {key: 2, value: 5000},
    {key: 3, value: 7500}
  ]);
  function loadPoints() {
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
      console.log('Status:', response.statusCode);
      console.log('Headers:', JSON.stringify(response.headers));
      console.log('Response:', body);
    });
  }
  return (
    <Fragment>
      <Header />
      {/* <ChargeView> */}
        <StyledPointsForm 
          className={StyledPointsForm}
          chargePoints={loadPoints}
          options={options}
          checked={checked}
          setChecked={setChecked}
        />
      {/* </ChargeView> */}
    </Fragment>
  );
}