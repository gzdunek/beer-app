import { combineReducers } from 'redux';

import byId, * as fromById from './byId';
import beerList, * as fromBeerList from './beerList';
import beerDetails, * as fromBeerDetails from './beerDetails';
import similarBeersById, * as fromSimilarBeersById from './similarBeersById';

const beers = combineReducers({
  byId,
  beerList,
  beerDetails,
  similarBeersById,
});

export default beers;

export const getBeers = state => fromBeerList
  .getIds(state.beerList)
  .map(id => fromById.getBeer(state.byId, id));
export const getBeerById = (state, id) => fromById.getBeer(state.byId, id);
export const getIsFetchingBeers = state => fromBeerList.getIsFetching(state.beerList);
export const getBeersErrorMessage = state => fromBeerList.getErrorMessage(state.beerList);
export const getCurrentPage = state => fromBeerList.getCurrentPage(state.beerList);
export const getIsNoMoreBeersToFetch = state => fromBeerList
  .getIsNoMoreItemsToFetch(state.beerList);

export const getSelectedId = state => fromBeerDetails.getSelectedId(state.beerDetails);
export const getIsFetchingBeerById = state => fromBeerDetails.getIsFetching(state.beerDetails);
export const getErrorMessageBeerById = state => fromBeerDetails.getErrorMessage(state.beerDetails);

export const getSimilarBeers = (state, id) => fromSimilarBeersById
  .getIdsById(state.similarBeersById, id)
  .map(similarBeerId => fromById.getBeer(state.byId, similarBeerId));
export const getIsFetchingSimilarBeers = (state, id) => fromSimilarBeersById
  .getIsFetchingById(state.similarBeersById, id);
export const getErrorMessageSimilarBeers = (state, id) => fromSimilarBeersById
  .getErrorMessageById(state.similarBeersById, id);
