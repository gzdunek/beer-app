import { normalize } from 'normalizr';
import * as schema from './schema';
import { getSimilarBeers } from '../reducers';
import handleErrors from '../helpers/handleErrors';

export const FETCH_SIMILAR_BEERS_REQUEST = 'FETCH_SIMILAR_BEERS_REQUEST';
export const FETCH_SIMILAR_BEERS_SUCCESS = 'FETCH_SIMILAR_BEERS_SUCCESS';
export const FETCH_SIMILAR_BEERS_FAILURE = 'FETCH_SIMILAR_BEERS_FAILURE';

const fetchSimilarBeersRequest = beerId => ({
  type: FETCH_SIMILAR_BEERS_REQUEST,
  beerId,
});

const fetchSimilarBeersSuccess = (beerId, response) => ({
  type: FETCH_SIMILAR_BEERS_SUCCESS,
  beerId,
  response,
});

const fetchSimilarBeersFailure = (beerId, message) => ({
  type: FETCH_SIMILAR_BEERS_FAILURE,
  beerId,
  message,
});

export const shouldFetchSimilarBeers = (state, beerId) => {
  const similarBeers = getSimilarBeers(state, beerId);
  if (similarBeers && similarBeers.length) {
    return false;
  }
  return true;
};

export const fetchSimilarBeers = (beerId, abvValue, ibuValue, ebcValue) => (dispatch) => {
  dispatch(fetchSimilarBeersRequest(beerId));

  const abvThreshold = 1;
  const ibuThreshold = 10;
  const ebcThreshold = 10;

  return fetch('https://api.punkapi.com/v2/beers?'
    + `abv_gt=${Math.max(0, Math.ceil(abvValue - abvThreshold))}&abv_lt=${Math.ceil(abvValue + abvThreshold)}`
    + `&ibu_gt=${Math.max(0, Math.ceil(ibuValue - ibuThreshold))}&ibu_lt=${Math.ceil(ibuValue + ibuThreshold)}`
    + `&ebc_gt=${Math.max(0, Math.ceil(ebcValue - ebcThreshold))}&ebc_lt=${Math.ceil(ebcValue + ebcThreshold)}`)
    .then(handleErrors)
    .then(response => response.json())
    .then(response => response.slice(1, 4))
    .then((json) => {
      const normalized = normalize(json, schema.arrayOfBeers);
      dispatch(fetchSimilarBeersSuccess(beerId, normalized));
    })
    .catch(message => dispatch(fetchSimilarBeersFailure(beerId, message)));
};
