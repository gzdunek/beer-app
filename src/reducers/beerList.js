import { combineReducers } from 'redux';
import { FETCH_BEERS_REQUEST, FETCH_BEERS_SUCCESS, FETCH_BEERS_FAILURE } from '../actions/beer';

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
      return false;
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
  currentPage,
});

export const getIds = state => state.ids;
export const getIsFetching = state => state.isFetching;
export const getCurrentPage = state => state.currentPage;

