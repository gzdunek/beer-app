import { normalize } from 'normalizr';
import * as schema from './schema';
import { getBeerById } from '../reducers';
import { fetchSimilarBeers, shouldFetchSimilarBeers } from './similarBeers';
import handleErrors from '../helpers/handleErrors';

export const FETCH_BEER_BY_ID_REQUEST = 'FETCH_BEER_BY_ID_REQUEST';
export const FETCH_BEER_BY_ID_SUCCESS = 'FETCH_BEER_BY_ID_SUCCESS';
export const FETCH_BEER_BY_ID_FAILURE = 'FETCH_BEER_BY_ID_FAILURE';
export const OPEN_BEER_DETAILS = 'OPEN_BEER_DETAILS';
export const CLOSE_BEER_DETAILS = 'CLOSE_BEER_DETAILS';

export const openBeerDetails = id => ({
  type: OPEN_BEER_DETAILS,
  id,
});

export const closeBeerDetails = () => ({
  type: CLOSE_BEER_DETAILS,
});

const fetchBeerByIdRequest = id => ({
  type: FETCH_BEER_BY_ID_REQUEST,
  id,
});

const fetchBeerByIdSuccess = response => ({
  type: FETCH_BEER_BY_ID_SUCCESS,
  response,
});

const fetchBeerByIdFailure = message => ({
  type: FETCH_BEER_BY_ID_FAILURE,
  message,
});

export const fetchBeerById = id => (dispatch) => {
  dispatch(fetchBeerByIdRequest(id));

  return fetch(`https://api.punkapi.com/v2/beers/${id}`)
    .then(handleErrors)
    .then(response => response.json())
    .then(response => response[0])
    .then((json) => {
      const normalized = normalize(json, schema.beer);
      dispatch(fetchBeerByIdSuccess(normalized));
    })
    .catch((error) => {
      dispatch(fetchBeerByIdFailure(error.message.toString()));
    });
};

const shouldFetchBeerById = (state, beerId) => {
  const beerById = getBeerById(state, beerId);
  if (!beerById) {
    return true;
  }
  return false;
};

const fetchBeerByIdIfNeeded = id => (dispatch, getState) => {
  if (shouldFetchBeerById(getState(), id)) {
    return dispatch(fetchBeerById(id))
      .catch(() => Promise.reject());
  }
  dispatch(fetchBeerByIdSuccess());
  return Promise.resolve();
};

export const fetchBeerAndSimilarBeers = id => (dispatch, getState) => {
  if (shouldFetchSimilarBeers(getState(), id)) {
    dispatch(fetchBeerByIdIfNeeded(id))
      .then(() => {
        const fetchedBeer = getBeerById(getState(), id);
        return dispatch(fetchSimilarBeers(id, fetchedBeer.abv, fetchedBeer.ibu, fetchedBeer.ebc));
      })
      .catch(() => {});
  }
};
