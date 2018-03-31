import React from 'react';
import PropTypes from 'prop-types';

import './BeerDetails.scss';
import Badge from '../../UI/Badge/Badge';
import BeerSmallItem, { BeerSmallItemPropTypes } from '../SmallItem/BeerSmallItem';

const BeerDetails = ({
  beer,
  isFetching,
  similarBeers,
  onSimilarBeerClick,
}) => (
  <div>
    {!isFetching ?
      <div className="beer-details">
        <div className="beer-details__image-column">
          <img className="beer-details__image" src={beer.image_url} alt={beer.name} />
        </div>
        <div className="beer-details__badges">
          <Badge backgroundColor="lightgray" name="IBU" value={beer.ibu} />
          <Badge backgroundColor="lightgray" name="ABV" value={beer.abv} />
        </div>
        <div className="beer-details__info-column" >
          <h1 className="beer-details__name">{beer.name}</h1>
          <h2 className="beer-details__tagline">{beer.tagline}</h2>
          <p className="beer-details__description">{beer.description}</p>
          <p className="beer-details__brewers-tips">{beer.brewers_tips}</p>
        </div>
        <div className="beer-details__similar-beers-container">
          <div className="beer-details__similar-beers-title">SIMILAR BEERS</div>
          <div className="beer-details__similar-beers">
            {similarBeers && similarBeers.map(similarBeer => (
              <BeerSmallItem
                key={similarBeer.id}
                beer={similarBeer}
                onClick={() => onSimilarBeerClick(similarBeer.id)}
              />))}
          </div>
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
  ibu: PropTypes.number,
  abv: PropTypes.number,
});

BeerDetails.propTypes = {
  // eslint-disable-next-line react/no-typos
  beer: BeerDetailsPropTypes,
  isFetching: PropTypes.bool,
  similarBeers: PropTypes.arrayOf(BeerSmallItemPropTypes),
  onSimilarBeerClick: PropTypes.func.isRequired,
};

BeerDetails.defaultProps = {
  beer: {},
  isFetching: true,
  similarBeers: [],
};
