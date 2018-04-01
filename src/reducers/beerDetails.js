import { combineReducers } from 'redux';
import {
  OPEN_BEER_DETAILS, CLOSE_BEER_DETAILS, FETCH_BEER_BY_ID_REQUEST,
  FETCH_BEER_BY_ID_SUCCESS, FETCH_BEER_BY_ID_FAILURE,
} from '../actions/beer';

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

const errorMessage = (state = null, action) => {
  switch (action.type) {
    case FETCH_BEER_BY_ID_FAILURE:
      return action.message;
    case FETCH_BEER_BY_ID_REQUEST:
    case FETCH_BEER_BY_ID_SUCCESS:
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  selectedId,
  isFetching,
  errorMessage,
});

export const getSelectedId = state => state.selectedId;
export const getIsFetching = state => state.isFetching;
export const getErrorMessage = state => state.errorMessage;
