import React from 'react';
import PropTypes from 'prop-types';

import './BeerSmallItem.scss';

const BeerSmallItem = ({ beer, onClick }) => (
  <div className="beer-small-item" onClick={onClick} onKeyPress={onClick} role="button" tabIndex="0" >
    <img className="beer-small-item__image" src={beer.image_url} alt={beer.name} />
    <p className="beer-small-item__name">{beer.name}</p>
  </div>
);

export default BeerSmallItem;

export const BeerSmallItemPropTypes = PropTypes.shape({
  image_url: PropTypes.string,
  name: PropTypes.string,
});

BeerSmallItem.propTypes = {
  // eslint-disable-next-line react/no-typos
  beer: BeerSmallItemPropTypes.isRequired,
  onClick: PropTypes.func.isRequired,
};
