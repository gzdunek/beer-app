import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from '../components/UI/Modal/Modal';

import BeerDetails, { BeerDetailsPropTypes } from '../components/Beer/Details/BeerDetails';
import { fetchBeerDetailsIfNeeded, closeBeerDetails } from '../actions/beer';

const mapStateToProps = (state) => {
  const beerDetailsVisibility = state.beerDetails.visible;
  return {
    beerDetailsVisibility,
    id: beerDetailsVisibility.id,
    beerDetails: state.beerDetails.byId[beerDetailsVisibility.id],
  };
};

class BeerDetailsContainer extends Component {
  componentDidMount() {
    const { dispatch, id } = this.props;
    if (id) {
      dispatch(fetchBeerDetailsIfNeeded(id));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, id } = this.props;
    if (nextProps.id !== null && nextProps.id !== id) {
      dispatch(fetchBeerDetailsIfNeeded(nextProps.id));
    }
  }

  handleRequestClose = () => {
    const { dispatch } = this.props;
    dispatch(closeBeerDetails());
  };

  render() {
    const { beerDetailsVisibility, beerDetails } = this.props;

    return (
      <div>
        <Modal
          isOpen={beerDetailsVisibility.isVisible}
          onRequestClose={this.handleRequestClose}
        >
          {beerDetails && <BeerDetails
            isFetching={beerDetails.isFetching}
            beer={beerDetails.details}
          />}
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps)(BeerDetailsContainer);

BeerDetailsContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.number,
  beerDetailsVisibility: PropTypes.shape({
    id: PropTypes.number,
    isVisible: PropTypes.bool.isRequired,
  }).isRequired,
  // eslint-disable-next-line react/no-typos
  beerDetails: BeerDetailsPropTypes,
};

BeerDetailsContainer.defaultProps = {
  id: null,
  beerDetails: {},
};
