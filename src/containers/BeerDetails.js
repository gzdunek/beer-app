import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Modal from '../components/UI/Modal/Modal';

import BeerDetails, { BeerDetailsPropTypes } from '../components/Beer/Details/BeerDetails';
import { closeBeerDetails, openBeerDetails, fetchBeerAndSimilarBeers } from '../actions/beer';
import { getSelectedId, getBeerById, getIsFetchingBeerById, getSimilarBeers } from '../reducers';
import { BeerItemPropTypes } from '../components/Beer/Item/BeerItem';

const mapStateToProps = (state) => {
  const selectedId = getSelectedId(state);
  return {
    selectedId,
    isFetching: getIsFetchingBeerById(state),
    beerDetails: getBeerById(state, selectedId),
    similarBeers: getSimilarBeers(state, selectedId),
  };
};

class BeerDetailsContainer extends Component {
  componentDidMount() {
    const { selectedId, match } = this.props;
    const id = selectedId || this.getIdFromUrl(match);
    if (id) {
      this.dispatchFetchBeersActions(id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const idFromUrl = this.getIdFromUrl(nextProps.match);
    if (idFromUrl !== nextProps.selectedId) {
      this.dispatchFetchBeersActions(idFromUrl);
    }
  }

  getIdFromUrl = (match) => {
    if (match.path === '/details/:id') {
      return +match.params.id;
    }
    return null;
  }

  dispatchFetchBeersActions = (id) => {
    const { dispatch } = this.props;
    dispatch(openBeerDetails(id));
    dispatch(fetchBeerAndSimilarBeers(id));
  }


  handleSimilarBeerClick = (id) => {
    const { history } = this.props;
    history.push(`/details/${id}`);
  };

  handleRequestClose = () => {
    const { dispatch, history } = this.props;
    dispatch(closeBeerDetails());
    history.push('/');
  };

  render() {
    const {
      selectedId,
      isFetching,
      beerDetails,
      similarBeers,
    } = this.props;

    return (
      <div>
        <Modal
          isOpen={!!selectedId}
          onRequestClose={this.handleRequestClose}
        >
          {beerDetails && <BeerDetails
            isFetching={isFetching}
            beer={beerDetails}
            similarBeers={similarBeers}
            onSimilarBeerClick={this.handleSimilarBeerClick}
          />}
        </Modal>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(BeerDetailsContainer));

BeerDetailsContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedId: PropTypes.number,
  isFetching: PropTypes.bool,
  // eslint-disable-next-line react/no-typos
  beerDetails: BeerDetailsPropTypes,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
  similarBeers: PropTypes.arrayOf(BeerItemPropTypes),
};

BeerDetailsContainer.defaultProps = {
  selectedId: null,
  isFetching: false,
  beerDetails: {},
  similarBeers: [],
};
