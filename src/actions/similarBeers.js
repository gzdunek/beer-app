import { normalize } from 'normalizr';
import * as schema from './schema';
import { getSimilarBeers } from '../reducers';

export const FETCH_SIMILAR_BEERS_REQUEST = 'FETCH_SIMILAR_BEERS_REQUEST';
export const FETCH_SIMILAR_BEERS_SUCCESS = 'FETCH_SIMILAR_BEERS_SUCCESS';
export const FETCH_SIMILAR_BEERS_FAILURE = 'FETCH_SIMILAR_BEERS_FAILURE';

export const shouldFetchSimilarBeers = (state, beerId) => {
  const similarBeers = getSimilarBeers(state, beerId);
  if (similarBeers && similarBeers.length) {
    return false;
  }
  return true;
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
