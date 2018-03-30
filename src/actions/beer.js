import { normalize } from 'normalizr';
import * as schema from './schema';
import { getBeerById } from '../reducers';

export const FETCH_BEERS_REQUEST = 'FETCH_BEERS_REQUEST';
export const FETCH_BEERS_SUCCESS = 'FETCH_BEERS_SUCCESS';
export const FETCH_BEERS_FAILURE = 'FETCH_BEERS_FAILURE';
export const FETCH_BEER_BY_ID_REQUEST = 'FETCH_BEER_BY_ID_REQUEST';
export const FETCH_BEER_BY_ID_SUCCESS = 'FETCH_BEER_BY_ID_SUCCESS';
export const FETCH_BEER_BY_ID_FAILURE = 'FETCH_BEER_BY_ID_FAILURE';
export const OPEN_BEER_DETAILS = 'OPEN_BEER_DETAILS';
export const CLOSE_BEER_DETAILS = 'CLOSE_BEER_DETAILS';
export const REQUEST_SIMILAR_BEERS = 'REQUEST_SIMILAR_BEERS';
export const RECIEVE_SIMILAR_BEERS = 'RECIEVE_SIMILAR_BEERS';

export const openBeerDetails = id => ({
  type: OPEN_BEER_DETAILS,
  id,
});

export const closeBeerDetails = () => ({
  type: CLOSE_BEER_DETAILS,
});

export const requestSimilarBeers = beerId => ({
  type: REQUEST_SIMILAR_BEERS,
  beerId,
});

export const receiveSimilarBeers = (beerId, similarBeers) => ({
  type: RECIEVE_SIMILAR_BEERS,
  beerId,
  similarBeers,
});

const shouldFetchBeerById = (state, beerId) => {
  const beerById = getBeerById(state, beerId);
  if (!beerById) {
    return true;
  }

  return false;
};

const fetchBeerById = id => (dispatch) => {
  dispatch({
    type: FETCH_BEER_BY_ID_REQUEST,
    id,
  });

  fetch(`https://api.punkapi.com/v2/beers/${id}`)
    .then(response => response.json())
    .then(response => response[0])
    .then((json) => {
      const normalized = normalize(json, schema.beer);
      console.log(normalized);
      dispatch({
        type: FETCH_BEER_BY_ID_SUCCESS,
        response: normalized,
      });
    });
};

export const fetchBeerByIdIfNeeded = id => (dispatch, getState) => {
  if (shouldFetchBeerById(getState(), id)) {
    dispatch(fetchBeerById(id));
  }
};

export const fetchBeers = (currentPage = 1) => (dispatch) => {
  dispatch({
    type: FETCH_BEERS_REQUEST,
    currentPage,
  });

  return fetch(`https://api.punkapi.com/v2/beers?&per_page=20&page=${currentPage}`)
    .then(response => response.json())
    .then((json) => {
      const normalized = normalize(json, schema.arrayOfBeers);
      dispatch({
        type: FETCH_BEERS_SUCCESS,
        currentPage,
        response: normalized,
      });
    });
};

// export const fetchSimilarBeers = (measurement, value) => dispatch => {
//   dispatch(requestSimilarBeers(paramter));
//   return fetch(`https://api.punkapi.com/v2/beers?
//     ${measurement}_gt=${gtValue}&
//     ${measurement}_lt=${ltValue}`)
//     .then(response => response.json())
//     .then(json => dispatch(receiveBeers(page, json)));
// }
