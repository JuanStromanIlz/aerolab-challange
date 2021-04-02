import { Fragment, useState } from "react";
import styled from "styled-components"
import Header from "./Header"

const ChargeView = styled.div`
  display: grid;
  place-items: center center;
  grid-column: 2 / 10;
`;

const PointsForm = (props) => {

  function selectOnlyThis(value) {
    props.setChecked(value)
  }

  // function chargePoints() {
  //   props.chargePoints(checked)
  // }

  return (
    <div className={props.className}>
      <div></div>
      <div>
        <form onSubmit={() => props.chargePoints()}>
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
          <button type="submit">Add points</button>
        </form>
      </div>
    </div>
  );
}

const StyledPointsForm = styled(PointsForm)`
  > button {
      height: 100%;
      padding: 0 24px;
      border-radius:100px;
      border:none;
      font-size:110%;
      :focus {
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
      body: JSON.stringify({ amount: checked })
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
      <ChargeView>
        <StyledPointsForm 
          className={StyledPointsForm}
          chargePoints={loadPoints}
          options={options}
          checked={checked}
          setChecked={setChecked}
        />
      </ChargeView>
    </Fragment>
  );
}