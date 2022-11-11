import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart';
import ProductCard from './pages/ProductCard';
import Search from './pages/Search';
/* a */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route exact path="/">
            <Search />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route
            exact
            path="/product-card/:id"
            render={ (props) => (<ProductCard
              { ...props }
            />
            ) }
          />
        </Switch>
      </header>
    </div>
  );
}

export default App;
