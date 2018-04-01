import { normalize } from 'normalizr';
import * as schema from './schema';
import handleErrors from '../helpers/handleErrors';

export const FETCH_BEERS_REQUEST = 'FETCH_BEERS_REQUEST';
export const FETCH_BEERS_SUCCESS = 'FETCH_BEERS_SUCCESS';
export const FETCH_BEERS_FAILURE = 'FETCH_BEERS_FAILURE';

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
      dispatch({
        type: FETCH_BEERS_SUCCESS,
        currentPage,
        response: normalized,
      });
    })
    .catch(message => (dispatch({ type: FETCH_BEERS_FAILURE, message: message.toString() })));
};
