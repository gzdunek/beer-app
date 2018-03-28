import React from 'react';
import PropTypes from 'prop-types';

import './BeerItem.scss';

const BeerItem = ({ beer }) => (
  <div onClick={beer.onBeerClick} onKeyPress={beer.onClick} role="button" tabIndex="0">
    <img className="beers-list__beer-image" src={beer.image_url} alt={beer.name} />
    <h3>{beer.name}</h3>
    <p>{beer.tagline}</p>
  </div>
);

export default BeerItem;

export const BeerItemPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  tagline: PropTypes.string,
  imageUrl: PropTypes.string,
  onClick: PropTypes.func.isRequired,
});

BeerItem.propTypes = {
  beer: BeerItemPropTypes.isRequired,
};
