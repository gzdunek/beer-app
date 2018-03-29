import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import BeerList from '../containers/BeerList';
import BeerDetails from '../containers/BeerDetails';

const App = () => (
  <div className="container">
    <Route path="/" component={BeerList} />
    <Route path="/details/:id" component={BeerDetails} />
  </div>
);

export default App;
