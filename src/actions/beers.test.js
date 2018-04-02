import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetch from 'jest-fetch-mock';

import { fetchBeers, FETCH_BEERS_REQUEST, FETCH_BEERS_SUCCESS, FETCH_BEERS_FAILURE, FETCH_BEERS_NO_MORE_ITEMS } from './beers';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test beers fetch action creator', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('expected actions should be dispatched on successful request', () => {
    const store = mockStore({});
    const expectedActions = [
      FETCH_BEERS_REQUEST,
      FETCH_BEERS_SUCCESS,
    ];

    fetch.mockResponseOnce(JSON.stringify([{ id: 1, name: 'Pale Ale' }]));

    store.dispatch(fetchBeers())
      .then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('expected actions should be dispatched on empty response', () => {
    const store = mockStore({});
    const expectedActions = [
      FETCH_BEERS_REQUEST,
      FETCH_BEERS_NO_MORE_ITEMS,
    ];

    fetch.mockResponseOnce(JSON.stringify([]));

    store.dispatch(fetchBeers())
      .then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('expected actions should be dispatched on failed request', () => {
    const store = mockStore({});
    const expectedActions = [
      FETCH_BEERS_REQUEST,
      FETCH_BEERS_FAILURE,
    ];

    fetch.mockReject(new Error('fake error message'));

    store.dispatch(fetchBeers())
      .then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });
});
