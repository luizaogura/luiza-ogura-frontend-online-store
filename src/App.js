import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart';
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
        </Switch>
      </header>
    </div>
  );
}

export default App;
