import react, {useContext, useEffect, useState} from "react"
import styled from "styled-components"
import {UserContext} from "./UserContext"

const StyledHeader = styled.header`
  grid-column: 1 / 11;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: sticky;
  top: 0;
  padding: 1em;
  max-height: 80px;
  background:#ffffff;
  z-index: 1;
  > div:first-child {
    display: grid;
    place-items: center;
  }
  > div:last-child {
    display: flex;
    flex-direction: row;
    gap: 18px;
    > div {
      display: grid;
      place-items: center;
    }
    > div:last-child {
      border-radius: 100px;
      padding: 0 13px;
      background-color: #ededed;
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

export default function Header(props){
  // const [profile, setProfile] = useState([]);
  // const loadProfile = async () => {
  //   const response = await fetch("https://coding-challenge-api.aerolab.co/user/me",
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //         'Authorization': `Bearer ${props.token}`
  //       }
  //     }
  //   );
  //   const data = await response.json();
  //   setProfile(data);
  // }
  // useEffect(() => {
  //   loadProfile();
  // }, []);
  const profile = useContext(UserContext);
  
  return(
    <StyledHeader>
      <div>
        <img src="icons/aerolab-logo.svg" alt="aerolab"/>
      </div>  
      <div>
        <div>
          <span>{profile.name}</span>
        </div>
        <div>
          <span>{profile.points}</span>
          <img src="icons/coin.svg" alt="your points"/>
        </div>
      </div>
    </StyledHeader>
  );
}