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
  const seletctedId = getSelectedId(state);
  return {
    seletctedId,
    isFetching: getIsFetchingBeerById(state),
    beerDetails: getBeerById(state, seletctedId),
    similarBeers: getSimilarBeers(state, seletctedId),
  };
};

class BeerDetailsContainer extends Component {
  componentDidMount() {
    const { dispatch, seletctedId, match } = this.props;

    if (seletctedId) {
      dispatch(fetchBeerAndSimilarBeers(seletctedId));
    } else if (match.path === '/details/:id') {
      const idFromUrl = +match.params.id;
      dispatch(openBeerDetails(idFromUrl));
      dispatch(fetchBeerAndSimilarBeers(idFromUrl));
    }
  }

  handleRequestClose = () => {
    const { dispatch, history } = this.props;
    dispatch(closeBeerDetails());
    history.push('/');
  };

  render() {
    const {
      seletctedId,
      isFetching,
      beerDetails,
      similarBeers,
    } = this.props;

    return (
      <div>
        <Modal
          isOpen={!!seletctedId}
          onRequestClose={this.handleRequestClose}
        >
          <div>
            {beerDetails && <BeerDetails
              isFetching={isFetching}
              beer={beerDetails}
            />}
            {similarBeers && similarBeers.map(beer => <p key={beer.id}>{beer.name}</p>)}
          </div>
        </Modal>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(BeerDetailsContainer));

BeerDetailsContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  seletctedId: PropTypes.number,
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
  seletctedId: null,
  isFetching: false,
  beerDetails: {},
  similarBeers: [],
};
