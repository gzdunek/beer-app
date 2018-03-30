const byId = (state = {}, action) => {
  if (action.response) {
    return {
      ...state,
      ...action.response.entities.beers,
    };
  }
  return state;
};

export default byId;

export const getBeer = (state, id) => state[id];
