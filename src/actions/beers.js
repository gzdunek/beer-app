import { normalize } from 'normalizr';
import * as schema from './schema';
import handleErrors from '../helpers/handleErrors';

export const FETCH_BEERS_REQUEST = 'FETCH_BEERS_REQUEST';
export const FETCH_BEERS_SUCCESS = 'FETCH_BEERS_SUCCESS';
export const FETCH_BEERS_FAILURE = 'FETCH_BEERS_FAILURE';
export const FETCH_BEERS_NO_MORE_ITEMS = 'FETCH_BEERS_NO_MORE_ITEMS';

export const fetchBeersRequest = () => ({
  type: FETCH_BEERS_REQUEST,
});

export const fetchBeersSuccess = (currentPage, response) => ({
  type: FETCH_BEERS_SUCCESS,
  currentPage,
  response,
});

export const fetchBeersFailure = message => ({
  type: FETCH_BEERS_FAILURE,
  message,
});

export const fetchBeersNoMoreItems = () => ({
  type: FETCH_BEERS_NO_MORE_ITEMS,
});

export const fetchBeers = (currentPage = 1) => (dispatch) => {
  dispatch(fetchBeersRequest());

  return fetch(`https://api.punkapi.com/v2/beers?&per_page=20&page=${currentPage}`)
    .then(handleErrors)
    .then(response => response.json())
    .then((json) => {
      const normalized = normalize(json, schema.arrayOfBeers);
      if (normalized.result.length) {
        dispatch(fetchBeersSuccess(currentPage, normalized));
      } else {
        dispatch(fetchBeersNoMoreItems());
      }
    })
    .catch((error) => {
      dispatch(fetchBeersFailure(error.message.toString()));
    });
};
