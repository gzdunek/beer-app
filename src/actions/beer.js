import { normalize } from 'normalizr';
import * as schema from './schema';
import { getBeerById, getSimilarBeers } from '../reducers';

export const FETCH_BEERS_REQUEST = 'FETCH_BEERS_REQUEST';
export const FETCH_BEERS_SUCCESS = 'FETCH_BEERS_SUCCESS';
export const FETCH_BEERS_FAILURE = 'FETCH_BEERS_FAILURE';
export const FETCH_BEER_BY_ID_REQUEST = 'FETCH_BEER_BY_ID_REQUEST';
export const FETCH_BEER_BY_ID_SUCCESS = 'FETCH_BEER_BY_ID_SUCCESS';
export const FETCH_BEER_BY_ID_FAILURE = 'FETCH_BEER_BY_ID_FAILURE';
export const OPEN_BEER_DETAILS = 'OPEN_BEER_DETAILS';
export const CLOSE_BEER_DETAILS = 'CLOSE_BEER_DETAILS';
export const FETCH_SIMILAR_BEERS_REQUEST = 'FETCH_SIMILAR_BEERS_REQUEST';
export const FETCH_SIMILAR_BEERS_SUCCESS = 'FETCH_SIMILAR_BEERS_SUCCESS';
export const FETCH_SIMILAR_BEERS_FAILURE = 'FETCH_SIMILAR_BEERS_FAILURE';

export const openBeerDetails = id => ({
  type: OPEN_BEER_DETAILS,
  id,
});

export const closeBeerDetails = () => ({
  type: CLOSE_BEER_DETAILS,
});

const fetchBeerById = id => (dispatch) => {
  dispatch({
    type: FETCH_BEER_BY_ID_REQUEST,
    id,
  });

  return fetch(`https://api.punkapi.com/v2/beers/${id}`)
    .then(response => response.json())
    .then(response => response[0])
    .then((json) => {
      const normalized = normalize(json, schema.beer);
      dispatch({
        type: FETCH_BEER_BY_ID_SUCCESS,
        response: normalized,
      });
    });
};

const shouldFetchBeerById = (state, beerId) => {
  const beerById = getBeerById(state, beerId);
  if (!beerById) {
    return true;
  }
  return false;
};

export const fetchBeerByIdIfNeeded = id => (dispatch, getState) => {
  if (shouldFetchBeerById(getState(), id)) {
    return dispatch(fetchBeerById(id));
  }
  return Promise.resolve();
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

export const fetchSimilarBeers = (beerId, abvValue, ibuValue, ebcValue) => (dispatch) => {
  dispatch({
    type: FETCH_SIMILAR_BEERS_REQUEST,
    beerId,
  });

  const abvThreshold = 1;
  const ibuThreshold = 10;
  const ebcThreshold = 5;

  return fetch('https://api.punkapi.com/v2/beers?'
    + `abv_gt=${Math.max(0, Math.ceil(abvValue - abvThreshold))}&abv_lt=${Math.ceil(abvValue + abvThreshold)}`
    + `&ibu_gt=${Math.max(0, Math.ceil(ibuValue - ibuThreshold))}&ibu_lt=${Math.ceil(ibuValue + ibuThreshold)}`
    + `&ebc_gt=${Math.max(0, Math.ceil(ebcValue - ebcThreshold))}&ebc_lt=${Math.ceil(ebcValue + ebcThreshold)}`)
    .then(
      response => response.json(),
      (error) => {
        dispatch({ type: FETCH_SIMILAR_BEERS_FAILURE, beerId, error });
        throw error;
      },
    )
    .then(response => response.slice(1, 4))
    .then((json) => {
      const normalized = normalize(json, schema.arrayOfBeers);
      dispatch({
        type: FETCH_SIMILAR_BEERS_SUCCESS,
        beerId,
        response: normalized,
      });
    })
    .catch(err => console.log(err));
};

const shouldFetchSimilarBeers = (state, beerId) => {
  const similarBeers = getSimilarBeers(state, beerId);
  if (similarBeers && similarBeers.length) {
    return false;
  }
  return true;
};

export const fetchBeerAndSimilarBeers = id => (dispatch, getState) => {
  if (shouldFetchSimilarBeers(getState(), id)) {
    dispatch(fetchBeerByIdIfNeeded(id)).then(() => {
      const fetchedBeer = getBeerById(getState(), id);
      return dispatch(fetchSimilarBeers(id, fetchedBeer.abv, fetchedBeer.ibu, fetchedBeer.ebc));
    });
  }
};
