import { combineReducers } from 'redux';
import { OPEN_BEER_DETAILS, CLOSE_BEER_DETAILS, FETCH_BEER_BY_ID_REQUEST,
  FETCH_BEER_BY_ID_SUCCESS, FETCH_BEER_BY_ID_FAILURE } from '../actions/beer';

export const selectedId = (state = null, action) => {
  switch (action.type) {
    case OPEN_BEER_DETAILS:
      return action.id;
    case CLOSE_BEER_DETAILS:
      return null;
    default:
      return state;
  }
};

export const isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_BEER_BY_ID_REQUEST:
      return true;
    case FETCH_BEER_BY_ID_SUCCESS:
    case FETCH_BEER_BY_ID_FAILURE:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  selectedId,
  isFetching,
});

export const getSelectedId = state => state.selectedId;
export const getIsFetching = state => state.isFetching;
