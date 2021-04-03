import { useContext } from "react"
import { Link } from "react-router-dom";
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
    }
  }
`;

const StyledLink = styled(Link)`
  color:#a3a3a3;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  place-items: center center;
  gap: 5px;
  :hover {
  color: #616161;
  }
`;

export default function Header(props) {
  const profile = useContext(UserContext);
  
  return(
    <StyledHeader>
      <Link to='/'>
        <div>
          <img src="icons/aerolab-logo.svg" alt="aerolab"/>
        </div>
      </Link>
      <div>
        <div>
          <StyledLink  to='/userItems'>
            {profile.name}
          </StyledLink>
        </div>
        <div>
          <StyledLink to='/addPoints'>
          <span>{profile.points}</span>
          <img src="icons/coin.svg" alt="your points"/>
          </StyledLink>
        </div>
      </div>
    </StyledHeader>
  );
}