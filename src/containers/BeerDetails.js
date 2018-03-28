import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchBeerDetailsIfNeeded } from '../actions/beer';

class BeerDetails extends Component {
  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(fetchBeerDetailsIfNeeded(id));
  }

  render() {
    const {beerDetailsVisibility, beerDetails } = this.props;
    return (
      // <div>
      //   {beerDetailsVisibility.isVisible &&
      //     <BeerModal {...beerDetails.details} onCloseClick={() => this.handleBeerClick(beerDetailsVisibility.id)} />}
      // </div>
    )
  }
}

BeerDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
