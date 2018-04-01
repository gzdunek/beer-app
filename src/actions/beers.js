import { normalize } from 'normalizr';
import * as schema from './schema';
import handleErrors from '../helpers/handleErrors';

export const FETCH_BEERS_REQUEST = 'FETCH_BEERS_REQUEST';
export const FETCH_BEERS_SUCCESS = 'FETCH_BEERS_SUCCESS';
export const FETCH_BEERS_FAILURE = 'FETCH_BEERS_FAILURE';
export const FETCH_BEERS_NO_MORE_ITEMS = 'FETCH_BEERS_NO_MORE_ITEMS';

export const fetchBeers = (currentPage = 1) => (dispatch) => {
  dispatch({
    type: FETCH_BEERS_REQUEST,
    currentPage,
  });

  return fetch(`https://api.punkapi.com/v2/beers?&per_page=20&page=${currentPage}`)
    .then(handleErrors)
    .then(response => response.json())
    .then((json) => {
      const normalized = normalize(json, schema.arrayOfBeers);
      if (normalized.result.length) {
        dispatch({
          type: FETCH_BEERS_SUCCESS,
          currentPage,
          response: normalized,
        });
      } else {
        dispatch({
          type: FETCH_BEERS_NO_MORE_ITEMS,
          currentPage,
          response: normalized,
        });
      }
    })
    .catch(message => (dispatch({ type: FETCH_BEERS_FAILURE, message: message.toString() })));
};
