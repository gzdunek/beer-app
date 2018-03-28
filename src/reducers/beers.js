import { combineReducers } from 'redux';
import { REQUEST_BEERS, RECEIVE_BEERS } from '../actions/beer';
import beerDetails from './beerDetails';

const beers = (
  state = {
    isFetching: false,
    items: [],
    page: 1,
  },
  action,
) => {
  switch (action.type) {
    case REQUEST_BEERS:
      return ({
        ...state,
        isFetching: true,
        page: action.page,
      });
    case RECEIVE_BEERS:
      return ({
        ...state,
        isFetching: false,
        page: action.page,
        items: [...state.items, ...action.beers],
      });
    default:
      return state;
  }
};

export default combineReducers({
  beers,
  beerDetails,
});
