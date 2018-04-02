import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetch from 'jest-fetch-mock';

import { FETCH_SIMILAR_BEERS_REQUEST, FETCH_SIMILAR_BEERS_SUCCESS, fetchSimilarBeers, FETCH_SIMILAR_BEERS_FAILURE } from './similarBeers';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test beers fetch action creator', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('expected actions should be dispatched on successful request', () => {
    const store = mockStore({});
    const expectedActions = [
      FETCH_SIMILAR_BEERS_REQUEST,
      FETCH_SIMILAR_BEERS_SUCCESS,
    ];

    fetch.mockResponseOnce(JSON.stringify([{ id: 1, name: 'Pale Ale' }]));

    store.dispatch(fetchSimilarBeers(1, 10, 10, 10))
      .then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('expected actions should be dispatched on failed request', () => {
    const store = mockStore({});
    const expectedActions = [
      FETCH_SIMILAR_BEERS_REQUEST,
      FETCH_SIMILAR_BEERS_FAILURE,
    ];

    fetch.mockReject(new Error('fake error message'));

    store.dispatch(fetchSimilarBeers(1, 10, 10, 10))
      .then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });
});
