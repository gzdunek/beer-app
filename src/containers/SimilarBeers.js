import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getSelectedId, getSimilarBeers, getIsFetchingSimilarBeers, getErrorMessageSimilarBeers } from '../reducers';
import { BeerItemPropTypes } from '../components/Beer/Item/BeerItem';
import BeerSmallItem from '../components/Beer/SmallItem/BeerSmallItem';
import generateArrayWithIds from '../helpers/generateArrayWithIds';
import FetchError from '../components/UI/FetchError/FetchError';
import { fetchBeerAndSimilarBeers } from '../actions/beer';

const mapStateToProps = (state) => {
  const selectedId = getSelectedId(state);
  return {
    selectedId,
    similarBeers: getSimilarBeers(state, selectedId),
    isFetching: getIsFetchingSimilarBeers(state, selectedId),
    errorMessage: getErrorMessageSimilarBeers(state, selectedId),
  };
};

class SimilarBeers extends Component {
  handleSimilarBeerClick = (id) => {
    const { history } = this.props;
    history.push(`/details/${id}`);
  };

  fetchData = () => {
    const { dispatch, selectedId } = this.props;
    dispatch(fetchBeerAndSimilarBeers(selectedId));
  };

  fakeSimilarBeers = generateArrayWithIds(3);

  render() {
    const { similarBeers, isFetching, errorMessage } = this.props;

    const similarBeersToRender = isFetching && !similarBeers.length ?
      this.fakeSimilarBeers : similarBeers;

    return (
      errorMessage ?
        <FetchError message={errorMessage} onRetry={this.dispatchFetchBeerActions} /> :
        similarBeersToRender.map(similarBeer => (
          <BeerSmallItem
            key={similarBeer.id}
            beer={similarBeer}
            isFetching={isFetching}
            onClick={() => this.handleSimilarBeerClick(similarBeer.id)}
          />))
    );
  }
}

export default withRouter(connect(mapStateToProps)(SimilarBeers));

SimilarBeers.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedId: PropTypes.number,
  similarBeers: PropTypes.arrayOf(BeerItemPropTypes),
  isFetching: PropTypes.bool,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  errorMessage: PropTypes.string,
};

SimilarBeers.defaultProps = {
  selectedId: null,
  similarBeers: [],
  isFetching: false,
  errorMessage: '',
};
