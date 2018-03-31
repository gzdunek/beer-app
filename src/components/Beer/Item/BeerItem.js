import React from 'react';
import PropTypes from 'prop-types';
import ProgressiveImage from 'react-progressive-image';
import ImageLoader from '../../UI/Loader/ImageLoader';

import SmallTextLoader from '../../UI/Loader/SmallTextLoader';
import './BeerItem.scss';

const BeerItem = ({ beer, onClick, isFetching }) => (
  <div className="beer-item" onClick={onClick} onKeyPress={onClick} role="button" tabIndex="0">
    <ProgressiveImage src={beer.image_url}>
      {(src, loading) => (loading ? <ImageLoader /> : <img className="beer-item__beer-image" src={src} alt={beer.name} />)}
    </ProgressiveImage>
    {isFetching ?
      <SmallTextLoader /> :
      <div>
        <h2 className="beer-item__beer-name">{beer.name}</h2>
        <p className="beer-item__beer-tagline">{beer.tagline}</p>
      </div>
    }

  </div>
);

export default BeerItem;

export const BeerItemPropTypes = PropTypes.shape({
  name: PropTypes.string,
  tagline: PropTypes.string,
  image_url: PropTypes.string,
});

BeerItem.propTypes = {
  // eslint-disable-next-line react/no-typos
  beer: BeerItemPropTypes.isRequired,
  onClick: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
};

BeerItem.defaultProps = {
  isFetching: false,
};

