import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Modal from '../components/UI/Modal/Modal';
import BeerDetails, { BeerDetailsPropTypes } from '../components/Beer/Details/BeerDetails';
import { closeBeerDetails, openBeerDetails, fetchBeerAndSimilarBeers } from '../actions/beer';
import { getSelectedId, getBeerById, getIsFetchingBeerById, getErrorMessageBeerById } from '../reducers';
import SimilarBeers from './SimilarBeers';
import FetchError from '../components/UI/FetchError/FetchError';

const mapStateToProps = (state) => {
  const selectedId = getSelectedId(state);
  return {
    selectedId,
    isFetching: getIsFetchingBeerById(state),
    beerDetails: getBeerById(state, selectedId),
    errorMessage: getErrorMessageBeerById(state),
  };
};

class BeerDetailsContainer extends Component {
  componentDidMount() {
    const { selectedId, match } = this.props;
    const id = selectedId || this.getIdFromUrl(match);
    if (id) {
      this.dispatchFetchBeerActions(id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const idFromUrl = this.getIdFromUrl(nextProps.match);
    if (idFromUrl !== nextProps.selectedId) {
      this.dispatchFetchBeerActions(idFromUrl);
    }
  }

  getIdFromUrl = (match) => {
    if (match.path === '/details/:id') {
      return +match.params.id;
    }
    return null;
  }

  dispatchFetchBeerActions = (id) => {
    const { dispatch } = this.props;
    dispatch(openBeerDetails(id));
    dispatch(fetchBeerAndSimilarBeers(id));
  }

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
      errorMessage,
    } = this.props;

    return (
      <div>
        <Modal
          isOpen={!!selectedId}
          onRequestClose={this.handleRequestClose}
        >
          {errorMessage ?
            <FetchError message={errorMessage} onRetry={this.dispatchFetchBeerActions} /> :
            <BeerDetails
              isFetching={isFetching}
              beer={beerDetails}
            >
              <SimilarBeers />
            </BeerDetails>
          }
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
  errorMessage: PropTypes.string,
};

BeerDetailsContainer.defaultProps = {
  selectedId: null,
  isFetching: false,
  beerDetails: {},
  errorMessage: '',
};
