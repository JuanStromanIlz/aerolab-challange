import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserContextProvider from './components/UserContext';
import ProductsView from "./components/ProductsView";
import UserItems from "./components/UserItems";
import AddPoints from './components/AddPoints';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDVkMzZmMWEyNGI1NzAwMjBjNmM2ZjYiLCJpYXQiOjE2MTY3MjE2NDl9.x0ZrkX4ojNa7qhGj4l_aCA3iQ6UgMYcRpY0VUoplHl8';

const StyledApp = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: auto 1fr;
  background-color: #f9f9f9;
  padding-bottom: 5em;
`;

function App() {
  return (
    <Router>
      <StyledApp>
      <UserContextProvider token={token} >
        <Switch>
          <Route exact path='/' render={() => <ProductsView token={token} url='https://coding-challenge-api.aerolab.co/products' />} />
          <Route path='/userItems' render={() => <UserItems token={token} url='https://coding-challenge-api.aerolab.co/user/history' />} />
          <Route path='/addPoints' render={() => <AddPoints token={token} />} />
        </Switch>
      </UserContextProvider>
      </StyledApp>
    </Router>
  );
}

export default App;
