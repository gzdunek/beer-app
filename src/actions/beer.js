export const REQUEST_BEERS = 'REQUEST_BEERS';
export const RECEIVE_BEERS = 'RECEIVE_BEERS';
export const REQUEST_BEER_DETAILS = 'REQUEST_BEER_DETAILS';
export const RECEIVE_BEER_DETAILS = 'RECEIVE_BEER_DETAILS';
export const OPEN_BEER_DETAILS = 'OPEN_BEER_DETAILS';
export const CLOSE_BEER_DETAILS = 'CLOSE_BEER_DETAILS';

export const requestBeers = page => ({
  type: REQUEST_BEERS,
  page,
});

export const receiveBeers = (page, results) => ({
  type: RECEIVE_BEERS,
  page,
  beers: results,
});

export const openBeerDetails = id => ({
  type: OPEN_BEER_DETAILS,
  id,
});

export const closeBeerDetails = () => ({
  type: CLOSE_BEER_DETAILS,
});

export const requestBeerDetails = id => ({
  type: REQUEST_BEER_DETAILS,
  id,
});

export const receiveBeerDetails = (id, details) => ({
  type: RECEIVE_BEER_DETAILS,
  id,
  details,
});

const shouldFetchBeerDetails = (state, beerId) => {
  const beerDetails = state.beerDetails.byId[beerId];
  if (!beerDetails) {
    return true;
  }

  return false;
};

const fetchBeerDetails = id => (dispatch) => {
  dispatch(requestBeerDetails(id));
  fetch(`https://api.punkapi.com/v2/beers/${id}`)
    .then(response => response.json())
    .then(response => response[0])
    .then(json => dispatch(receiveBeerDetails(id, json)));
};

export const fetchBeerDetailsIfNeeded = id => (dispatch, getState) => {
  if (shouldFetchBeerDetails(getState(), id)) {
    dispatch(fetchBeerDetails(id));
  }
};

export const fetchBeers = (page = 1) => (dispatch) => {
  dispatch(requestBeers(page));
  return fetch(`https://api.punkapi.com/v2/beers?page=${page}`)
    .then(response => response.json())
    .then(json => dispatch(receiveBeers(page, json)));
};
