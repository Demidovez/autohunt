import Actions from "../types/searchActionTypes";

export const goSearchAction = (searchStr) => ({
  type: Actions.START_SEARCH,
  payload: { searchStr },
});

export const setFoundAdvertsAction = (foundAdverts, count) => ({
  type: Actions.SET_FOUND_ADVERTS,
  payload: { foundAdverts, count },
});
