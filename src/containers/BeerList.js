import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import BeerList from '../components/Beer/List/BeerList';
import { openBeerDetails } from '../actions/beer';
import { fetchBeers } from '../actions/beers';
import { BeerItemPropTypes } from '../components/Beer/Item/BeerItem';
import { getBeers, getCurrentPage, getIsFetchingBeers, getBeersErrorMessage } from '../reducers';
import generateArrayWithIds from '../helpers/generateArrayWithIds';
import FetchError from '../components/UI/FetchError/FetchError';

const mapStateToProps = state => ({
  isFetching: getIsFetchingBeers(state),
  beers: getBeers(state),
  currentPage: getCurrentPage(state),
  errorMessage: getBeersErrorMessage(state),
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
    const { dispatch, history } = this.props;
    dispatch(openBeerDetails(id));
    history.push(`/details/${id}`);
  };

  fakeBeers = generateArrayWithIds(20);

  render() {
    const { beers, isFetching, errorMessage } = this.props;

    const beersToRender = isFetching && !beers.length ? this.fakeBeers : beers;

    return (
      <div id="beers-list">
        <h1>Beers.</h1>
        {errorMessage ?
          <FetchError onRetry={this.fetchData} message={errorMessage} /> :
          <BeerList
            beers={beersToRender}
            isFetching={isFetching}
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
  currentPage: PropTypes.number.isRequired,
  beers: PropTypes.arrayOf(BeerItemPropTypes),
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};

BeersListContainer.defaultProps = {
  beers: [],
  errorMessage: null,
};
