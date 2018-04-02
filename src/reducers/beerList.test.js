import reducer from './beerList';
import { FETCH_BEERS_REQUEST, fetchBeersRequest, fetchBeersSuccess, FETCH_BEERS_SUCCESS, FETCH_BEERS_NO_MORE_ITEMS, fetchBeersNoMoreItems } from '../actions/beers';

const initialState = {
  currentPage: 1,
  errorMessage: null,
  ids: [],
  isFetching: false,
  isNoMoreItems: false,
};

describe('beerList', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`should handle ${FETCH_BEERS_REQUEST}`, () => {
    expect(reducer({}, fetchBeersRequest())).toEqual({ ...initialState, isFetching: true });
  });

  it(`should handle ${FETCH_BEERS_SUCCESS}`, () => {
    expect(reducer({}, fetchBeersSuccess(1, { result: [1, 2, 3] }))).toEqual({
      ...initialState,
      isFetching: false,
      currentPage: 1,
      ids: [1, 2, 3],
    });
  });

  it(`should handle ${FETCH_BEERS_NO_MORE_ITEMS}`, () => {
    expect(reducer({}, fetchBeersNoMoreItems())).toEqual({
      ...initialState,
      isNoMoreItems: true,
    });
  });
});
