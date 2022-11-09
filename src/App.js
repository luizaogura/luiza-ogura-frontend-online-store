import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Search from './pages/Search';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route exact path="/">
            <Search />
          </Route>
        </Switch>
      </header>
    </div>
  );
}

export default App;
