import { FETCH_SIMILAR_BEERS_REQUEST, FETCH_SIMILAR_BEERS_SUCCESS } from '../actions/beer';

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
        },
      };
    default:
      return state;
  }
};

export default similarBeers;
