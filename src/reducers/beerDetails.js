import { combineReducers } from 'redux';
import { CHANGE_BEER_DETAILS_VISIBILITY, RECEIVE_BEER_DETAILS, REQUEST_BEER_DETAILS } from '../actions/beer';

export const beerDetailsVisible = (state = { id: null, isVisible: false }, action) => {
  switch (action.type) {
    case CHANGE_BEER_DETAILS_VISIBILITY:
      return ({
        id: action.id,
        isVisible: !state.isVisible,
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
        [action.id]: { isFetching: true },
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
