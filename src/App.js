import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserContextProvider from './components/UserContext';
import ProductsView from "./components/ProductsView";
import UserItems from "./components/UserItems";
import AddPoints from './components/AddPoints';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDVkMzZmMWEyNGI1NzAwMjBjNmM2ZjYiLCJpYXQiOjE2MTY3MjE2NDl9.x0ZrkX4ojNa7qhGj4l_aCA3iQ6UgMYcRpY0VUoplHl8';

function App() {
  return (
    <Router>
      <div className="App">
      <UserContextProvider token={token} >
        <Switch>
          <Route exact path='/' render={() => <ProductsView token={token} url='https://coding-challenge-api.aerolab.co/products' />} />
          <Route path='/userItems' render={() => <UserItems token={token} url='https://coding-challenge-api.aerolab.co/user/history' />} />
          <Route path='/addPoints' render={() => <AddPoints token={token} />} />
        </Switch>
      </UserContextProvider>
      </div>
    </Router>
  );
}

export default App;
