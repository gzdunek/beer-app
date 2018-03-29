import React from 'react';
import PropTypes from 'prop-types';

import './BeerDetails.scss';

const BeerDetails = ({ beer, isFetching }) => (
  <div>
    {!isFetching ?
      <div className="beer-details">
        <img className="beer-details__image" src={beer.image_url} alt={beer.name} />
        <div className="beer-details__info" >
          <h1 className="beer-details__name">{beer.name}</h1>
          <h2 className="beer-details__tagline">{beer.tagline}</h2>
          <p className="beer-details__description">{beer.description}</p>
          <p className="beer-details__brewers-tips">{beer.brewers_tips}</p>
        </div>
      </div>
      : <p>Loading...</p>
    }
  </div>
);

export default BeerDetails;

export const BeerDetailsPropTypes = PropTypes.shape({
  name: PropTypes.string,
  tagline: PropTypes.string,
  image_url: PropTypes.string,
  description: PropTypes.string,
  brewer_tips: PropTypes.string,
});

BeerDetails.propTypes = {
  // eslint-disable-next-line react/no-typos
  beer: BeerDetailsPropTypes,
  isFetching: PropTypes.bool,
};

BeerDetails.defaultProps = {
  beer: {},
  isFetching: true,
};
