import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import HomePage from './pages/home/HomePage';
import GraphPage from './pages/graph/GraphPage';
import MusicPage from './pages/music/MusicPage';
import PrimePage from './pages/prime/PrimePage';
import NavBar from './components/NavBar';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <NavBar></NavBar>
            <Route exact path="/" component={HomePage} />
            <Route path="/music" component={MusicPage} />
            <Route path="/prime" component={PrimePage} />
            <Route path="/graph" component={GraphPage} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
