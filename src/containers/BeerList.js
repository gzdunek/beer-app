import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import BeerList from '../components/Beer/List/BeerList';
import { fetchBeers } from '../actions/beers';
import { BeerItemPropTypes } from '../components/Beer/Item/BeerItem';
import { getBeers, getCurrentPage, getIsFetchingBeers, getBeersErrorMessage, getIsNoMoreBeersToFetch } from '../reducers';
import generateArrayWithIds from '../helpers/generateArrayWithIds';
import FetchError from '../components/UI/FetchError/FetchError';

const mapStateToProps = state => ({
  isFetching: getIsFetchingBeers(state),
  beers: getBeers(state),
  currentPage: getCurrentPage(state),
  errorMessage: getBeersErrorMessage(state),
  isNoMoreBeers: getIsNoMoreBeersToFetch(state),
});

class BeersListContainer extends Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData = (page = 1) => {
    const { dispatch } = this.props;
    dispatch(fetchBeers(page));
  }

  handleLoadMoreBeers = () => {
    const { currentPage } = this.props;
    this.fetchData(currentPage + 1);
  };

  handleBeerClick = (id) => {
    const { history } = this.props;
    history.push(`/details/${id}`);
  };

  fakeBeers = generateArrayWithIds(20);

  render() {
    const {
      beers,
      isFetching,
      errorMessage,
      isNoMoreBeers,
    } = this.props;

    const beersToRender = isFetching && !beers.length ? this.fakeBeers : beers;

    return (
      <div id="beers-list">
        <h1>Beers.</h1>
        {errorMessage ?
          <FetchError onRetry={this.fetchData} message={errorMessage} /> :
          <BeerList
            beers={beersToRender}
            isFetching={isFetching}
            isNoMoreBeers={isNoMoreBeers}
            loadMoreBeers={this.handleLoadMoreBeers}
            onBeerClick={this.handleBeerClick}
          />
        }
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(BeersListContainer));

BeersListContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  beers: PropTypes.arrayOf(BeerItemPropTypes),
  isFetching: PropTypes.bool,
  errorMessage: PropTypes.string,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  isNoMoreBeers: PropTypes.bool,
};

BeersListContainer.defaultProps = {
  beers: [],
  currentPage: 1,
  errorMessage: null,
  isNoMoreBeers: false,
  isFetching: false,
};
