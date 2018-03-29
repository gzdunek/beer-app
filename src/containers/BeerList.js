import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import BeerList from '../components/Beer/List/BeerList';
import { openBeerDetails, fetchBeers } from '../actions/beer';
import { BeerItemPropTypes } from '../components/Beer/Item/BeerItem';

const mapStateToProps = state => ({
  isFetching: state.beers.isFetching,
  beers: state.beers.items,
  page: state.beers.page,
});

class BeersListContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchBeers());
  }

  handleLoadMoreBeers = () => {
    const { dispatch, page } = this.props;
    dispatch(fetchBeers(page + 1));
  };

  handleBeerClick = (id) => {
    const { dispatch, history } = this.props;
    dispatch(openBeerDetails(id));
    history.push(`/details/${id}`);
  };

  render() {
    const { beers, isFetching } = this.props;

    return (
      <div id="beers-list">
        {isFetching && <p>Please wait...</p>}
        <BeerList
          beers={beers}
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
  page: PropTypes.number.isRequired,
  beers: PropTypes.arrayOf(BeerItemPropTypes).isRequired,
  isFetching: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};
