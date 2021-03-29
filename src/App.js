import './App.css';
import Header from './components/Header';
import HeaderImg from './components/HeaderImg';
import ProductsView from "./components/ProductsView"
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDVkMzZmMWEyNGI1NzAwMjBjNmM2ZjYiLCJpYXQiOjE2MTY3MjE2NDl9.x0ZrkX4ojNa7qhGj4l_aCA3iQ6UgMYcRpY0VUoplHl8';

function App() {
  return (
    <div className="App">
    <Header 
      token={token}
    />
    <HeaderImg/>
    <ProductsView 
      token={token}
    />
    </div>
  );
}

export default App;
