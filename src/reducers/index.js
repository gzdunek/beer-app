import { combineReducers } from 'redux';

import byId, * as fromById from './byId';
import beerList, * as fromBeerList from './beerList';
import beerDetails, * as fromBeerDetails from './beerDetails';

const beers = combineReducers({
  byId,
  beerList,
  beerDetails,
});

export default beers;

export const getBeers = state => fromBeerList
  .getIds(state.beerList)
  .map(id => fromById.getBeer(state.byId, id));
export const getBeerById = (state, id) => fromById.getBeer(state.byId, id);
export const getIsFetchingBeers = state => fromBeerList.getIsFetching(state.beerList);
export const getCurrentPage = state => fromBeerList.getCurrentPage(state.beerList);
export const getSelectedId = state => fromBeerDetails.getSelectedId(state.beerDetails);
export const getIsFetchingBeerById = state => fromBeerDetails.getIsFetching(state.beerDetails);