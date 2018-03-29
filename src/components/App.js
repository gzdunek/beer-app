import React from 'react';
import './App.css';
import BeerList from '../containers/BeerList';
import BeerDetails from '../containers/BeerDetails';

const App = () => (
  <div className="container">
    <BeerDetails />
    <BeerList />
  </div>
);

export default App;
