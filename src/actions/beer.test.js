import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetch from 'jest-fetch-mock';

import { FETCH_BEER_BY_ID_REQUEST, FETCH_BEER_BY_ID_SUCCESS, fetchBeerById, FETCH_BEER_BY_ID_FAILURE } from './beer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test beers fetch action creator', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('expected actions should be dispatched on successful request', () => {
    const store = mockStore({});
    const expectedActions = [
      FETCH_BEER_BY_ID_REQUEST,
      FETCH_BEER_BY_ID_SUCCESS,
    ];

    fetch.mockResponseOnce(JSON.stringify([{ id: 1, name: 'Pale Ale' }]));

    store.dispatch(fetchBeerById(1))
      .then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('expected actions should be dispatched on failed request', () => {
    const store = mockStore({});
    const expectedActions = [
      FETCH_BEER_BY_ID_REQUEST,
      FETCH_BEER_BY_ID_FAILURE,
    ];

    fetch.mockReject(new Error('fake error message'));

    store.dispatch(fetchBeerById(1))
      .then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });
});
