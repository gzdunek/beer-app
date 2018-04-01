import { FETCH_SIMILAR_BEERS_REQUEST, FETCH_SIMILAR_BEERS_SUCCESS, FETCH_SIMILAR_BEERS_FAILURE } from '../actions/similarBeers';

const similarBeers = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SIMILAR_BEERS_REQUEST:
      return {
        ...state,
        [action.beerId]: {
          ...state[action.beerId],
          ids: [],
          isFetching: true,
        },
      };
    case FETCH_SIMILAR_BEERS_SUCCESS:
      return {
        ...state,
        [action.beerId]: {
          ...state[action.beerId],
          ids: action.response.result,
          isFetching: false,
          errorMessage: null,
        },
      };
    case FETCH_SIMILAR_BEERS_FAILURE:
      return {
        ...state,
        [action.beerId]: {
          ...state[action.beerId],
          isFetching: false,
          errorMessage: action.message,
        },
      };
    default:
      return state;
  }
};

export default similarBeers;
