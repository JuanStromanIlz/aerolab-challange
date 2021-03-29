import react, {useEffect, useState} from "react"
import styled from "styled-components"

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: sticky;
  top: 0;
  height: 80px;
  background:#ffffff;
  padding: 0 42px;
  z-index: 1;
  justify-content: space-between;
  > ul {
    display: flex;
    flex-direction: row;
    place-items:center;
    margin: 0;
    list-style-type: none;
    > li {
      font-size:24px;
      color:#616161;
      letter-spacing:-0.15px;
      line-height:48px;
      text-align:center;
      display: flex;
      place-items: center;
      padding: 0 13px 0 21px;
      :last-child {
        margin-left: 18px;
        border-radius: 100px;
        background-color: #ededed;
        > svg {
          display: block;
          margin: 4px 0 0 6px;    
        }
      }
    }
  }
`;

export default function Header(props){
  const [profile, setProfile] = useState([]);
  const loadProfile = async () => {
    const response = await fetch("https://coding-challenge-api.aerolab.co/user/me",
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${props.token}`
        }
      }
    );
    const data = await response.json();
    setProfile(data);
  }
  useEffect(() => {
    loadProfile();
  }, []);

  return(
    <StyledHeader>
      <img src="icons/aerolab-logo.svg"/>
      <ul>
        <li>{profile.name}</li>
        <li>{profile.points}
            <img src="icons/coin.svg"/>
        </li>
      </ul>
    </StyledHeader>
  );
}