import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import BeerList from '../components/Beer/List/BeerList';
import { openBeerDetails, fetchBeers } from '../actions/beer';
import { BeerItemPropTypes } from '../components/Beer/Item/BeerItem';
import { getBeers, getCurrentPage, getIsFetchingBeers } from '../reducers';
import generateArrayWithIds from '../helpers/generateArrayWithIds';

const mapStateToProps = state => ({
  isFetching: getIsFetchingBeers(state),
  beers: getBeers(state),
  currentPage: getCurrentPage(state),
});

class BeersListContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    console.log(this.props.beers);
    dispatch(fetchBeers());
  }

  handleLoadMoreBeers = () => {
    const { dispatch, currentPage } = this.props;
    dispatch(fetchBeers(currentPage + 1));
  };

  handleBeerClick = (id) => {
    const { dispatch, history } = this.props;
    dispatch(openBeerDetails(id));
    history.push(`/details/${id}`);
  };

  fakeBeers = generateArrayWithIds(20);

  render() {
    const { beers, isFetching } = this.props;

    const beersToRender = isFetching ? this.fakeBeers : beers;

    return (
      <div id="beers-list">
        <h1>Beers.</h1>
        <BeerList
          beers={beersToRender}
          isFetching={isFetching}
          loadMoreBeers={this.handleLoadMoreBeers}
          onBeerClick={this.handleBeerClick}
        />
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
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};

BeersListContainer.defaultProps = {
  beers: [],
};
