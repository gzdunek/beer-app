import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';
import BeerItem, { BeerItemPropTypes } from '../Item/BeerItem';

import './BeerList.scss';

const BeerList = ({
  beers,
  onBeerClick,
  loadMoreBeers,
  isFetching,
  isNoMoreBeers,
}) => (
  <InfiniteScroll
    style={{ overflow: 'visible' }}
    next={loadMoreBeers}
    hasMore={!isNoMoreBeers}
    scrollThreshold={0.7}
    dataLength={beers.length}
    loader={<div className="loader" key={0}>Loading ...</div>}
  >
    <div className="beer-list">
      {beers && beers.map(beer => (
        <BeerItem
          key={beer.id}
          isFetching={isFetching}
          beer={beer}
          onClick={() => onBeerClick(beer.id)}
        />
      ))}
    </div>
  </InfiniteScroll>
);

export default BeerList;

BeerList.propTypes = {
  beers: PropTypes.arrayOf(BeerItemPropTypes).isRequired,
  onBeerClick: PropTypes.func.isRequired,
  loadMoreBeers: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  isNoMoreBeers: PropTypes.bool,
};

BeerList.defaultProps = {
  isFetching: false,
  isNoMoreBeers: false,
};
