import React from 'react';
import PropTypes from 'prop-types';
import ProgressiveImage from 'react-progressive-image';
import ImageLoader from '../../UI/Loader/ImageLoader';
import SmallTextLoader from '../../UI/Loader/SmallTextLoader';

import './BeerSmallItem.scss';

const BeerSmallItem = ({ beer, onClick, isFetching }) => (
  <div className="beer-small-item" onClick={onClick} onKeyPress={onClick} role="button" tabIndex="0" >
    <ProgressiveImage src={beer.image_url}>
      {(src, loading) => (loading ? <ImageLoader /> : <img className="beer-small-item__image" src={src} alt={beer.name} />)}
    </ProgressiveImage>
    {!isFetching ?
      <p className="beer-small-item__name">{beer.name}</p>
      : <SmallTextLoader />}
  </div>
);

export default BeerSmallItem;

export const BeerSmallItemPropTypes = PropTypes.shape({
  image_url: PropTypes.string,
  name: PropTypes.string,
});

BeerSmallItem.propTypes = {
  beer: BeerSmallItemPropTypes,
  onClick: PropTypes.func,
  isFetching: PropTypes.bool,
};

BeerSmallItem.defaultProps = {
  beer: {},
  onClick: () => {},
  isFetching: false,
};
