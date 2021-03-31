import './App.css';
import UserContextProvider from './components/UserContext'
import ProductsView from "./components/ProductsView"
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDVkMzZmMWEyNGI1NzAwMjBjNmM2ZjYiLCJpYXQiOjE2MTY3MjE2NDl9.x0ZrkX4ojNa7qhGj4l_aCA3iQ6UgMYcRpY0VUoplHl8';

function App() {
  return (
    <div className="App">
    <UserContextProvider token={token} >
      <ProductsView token={token} />
    </UserContextProvider>
    </div>
  );
}

export default App;
