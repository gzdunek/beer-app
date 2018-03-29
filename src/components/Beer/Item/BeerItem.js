import React from 'react';
import PropTypes from 'prop-types';

import './BeerItem.scss';

const BeerItem = ({ beer, onClick }) => (
  <div className="beer-item" onClick={onClick} onKeyPress={onClick} role="button" tabIndex="0">
    <img className="beer-item__beer-image" src={beer.image_url} alt={beer.name} />
    <h2 className="beer-item__beer-name">{beer.name}</h2>
    <p className="beer-item__beer-tagline">{beer.tagline}</p>
  </div>
);

export default BeerItem;

export const BeerItemPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  tagline: PropTypes.string,
  image_url: PropTypes.string,
});

BeerItem.propTypes = {
  // eslint-disable-next-line react/no-typos
  beer: BeerItemPropTypes.isRequired,
  onClick: PropTypes.func.isRequired,
};
