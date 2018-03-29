import { combineReducers } from 'redux';
import { OPEN_BEER_DETAILS, RECEIVE_BEER_DETAILS, REQUEST_BEER_DETAILS, CLOSE_BEER_DETAILS } from '../actions/beer';

export const beerDetailsVisible = (state = { id: null, isVisible: false }, action) => {
  switch (action.type) {
    case OPEN_BEER_DETAILS:
      return ({
        id: action.id,
        isVisible: true,
      });
    case CLOSE_BEER_DETAILS:
      return ({
        id: null,
        isVisible: false,
      });
    default:
      return state;
  }
};

export const beerDetailsById = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_BEER_DETAILS:
      return ({
        ...state,
        [action.id]: {
          isFetching: true,
          details: {},
        },
      });
    case RECEIVE_BEER_DETAILS:
      return ({
        ...state,
        [action.id]: {
          isFetching: false,
          details: action.details,
        },
      });
    default:
      return state;
  }
};

export default combineReducers({
  visible: beerDetailsVisible,
  byId: beerDetailsById,
});
