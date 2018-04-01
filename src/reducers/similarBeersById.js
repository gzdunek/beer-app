import { FETCH_SIMILAR_BEERS_REQUEST, FETCH_SIMILAR_BEERS_SUCCESS, FETCH_SIMILAR_BEERS_FAILURE } from '../actions/similarBeers';

const similarBeer = (state = {
  isFetching: false,
  errorMessage: null,
  ids: [],
}, action) => {
  switch (action.type) {
    case FETCH_SIMILAR_BEERS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_SIMILAR_BEERS_SUCCESS:
      return {
        ...state,
        ids: action.response.result,
        isFetching: false,
        errorMessage: null,
      };
    case FETCH_SIMILAR_BEERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.message,
      };
    default:
      return state;
  }
};

const similarBeersById = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SIMILAR_BEERS_REQUEST:
    case FETCH_SIMILAR_BEERS_SUCCESS:
    case FETCH_SIMILAR_BEERS_FAILURE:
      return {
        ...state,
        [action.beerId]: similarBeer(state[action.beerId], action),
      };
    default:
      return state;
  }
};

export default similarBeersById;

export const getIdsById = (state, id) => (state[id] ? state[id].ids : []);
export const getIsFetchingById = (state, id) => state[id] && state[id].isFetching;
export const getErrorMessageById = (state, id) => state[id] && state[id].errorMessage;
