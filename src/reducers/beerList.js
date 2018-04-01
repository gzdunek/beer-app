import { combineReducers } from 'redux';
import { FETCH_BEERS_REQUEST, FETCH_BEERS_SUCCESS, FETCH_BEERS_FAILURE, FETCH_BEERS_NO_MORE_ITEMS } from '../actions/beers';

const ids = (state = [], action) => {
  switch (action.type) {
    case FETCH_BEERS_SUCCESS:
      return [
        ...state,
        ...action.response.result,
      ];
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_BEERS_REQUEST:
      return true;
    case FETCH_BEERS_SUCCESS:
    case FETCH_BEERS_FAILURE:
    case FETCH_BEERS_NO_MORE_ITEMS:
      return false;
    default:
      return state;
  }
};

const errorMessage = (state = null, action) => {
  switch (action.type) {
    case FETCH_BEERS_FAILURE:
      return action.message;
    case FETCH_BEERS_REQUEST:
    case FETCH_BEERS_SUCCESS:
      return null;
    default:
      return state;
  }
};

const isNoMoreItems = (state = false, action) => {
  switch (action.type) {
    case FETCH_BEERS_NO_MORE_ITEMS:
      return true;
    default:
      return state;
  }
};

const currentPage = (state = 1, action) => {
  switch (action.type) {
    case FETCH_BEERS_SUCCESS:
      return action.currentPage;
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  isFetching,
  errorMessage,
  currentPage,
  isNoMoreItems,
});

export const getIds = state => state.ids;
export const getIsFetching = state => state.isFetching;
export const getErrorMessage = state => state.errorMessage;
export const getCurrentPage = state => state.currentPage;
export const getIsNoMoreItemsToFetch = state => state.isNoMoreItems;
