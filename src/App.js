import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/header/Header';
import Home from './components/home/Home';
import About from './components/about/About';
import Compare from './components/compare/Compare';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <div>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
            <Route path="/about/:symbol">
              <About />
            </Route>
            <Route path="/compare/:symbols">
              <Compare />
            </Route>
          </Switch>
        </div>
      </Router>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
