import Actions from "../types/searchActionTypes";

export const setIsLoadingAction = () => ({
  type: Actions.SET_IS_LOADING,
});

export const goResetSearchBarAction = () => ({
  type: Actions.RESET_SEARCH_DATA,
});

export const goResetSearchBarWithValueAction = (resetValue) => ({
  type: Actions.RESET_SEARCH_DATA_WITH_VALUE,
  payload: resetValue,
});

export const setSearchStrAction = (searchStr) => ({
  type: Actions.SET_SEARCH_STR,
  payload: searchStr,
});

export const setSearchByOneAction = (searchBy) => ({
  type: Actions.SET_SEARCH_BY,
  payload: searchBy,
});

export const goSearchAction = (searchStr, searchByArray, filterOptions) => ({
  type: Actions.SEARCH_ADVERTS,
  payload: { searchStr, searchByArray, filterOptions },
});

export const goSearchMoreAction = (
  searchStr,
  searchBy,
  offset,
  filterOptions
) => ({
  type: Actions.SEARCH_ADVERTS_MORE,
  payload: { searchStr, searchBy, offset, filterOptions },
});

export const setAdvertsMoreAction = (searchBy, data) => ({
  type: Actions.SET_SEARCH_ADVERTS_MORE,
  payload: { searchBy, moreAdverts: data[0].adverts },
});

export const setFilterResultToSearchResultAction = (
  adverts,
  count,
  searchBy
) => ({
  type: Actions.SET_FILTER_RESULT_TO_SEARCH_RESULT,
  payload: { adverts, count, searchBy },
});

export const setAdvertsAction = (data) => ({
  type: Actions.SET_ADVERTS,
  payload: data,
});

export const setAdvertsByKeyAction = (data) => ({
  type: Actions.SET_ADVERTS_BY_KEY,
  payload: data[0],
});

export const goSearchByNameAction = (searchStr) => ({
  type: Actions.SEARCH_ADVERTS_BY_NAME,
  payload: { searchStr, by: "name" },
});

export const goSearchByRublesAction = (searchStr) => ({
  type: Actions.SEARCH_ADVERTS_BY_RUBLES,
  payload: { searchStr, by: "rubles" },
});

export const goSearchByDollarsAction = (searchStr) => ({
  type: Actions.SEARCH_ADVERTS_BY_DOLLARS,
  payload: { searchStr, by: "dollars" },
});

export const goSearchByMileageAction = (searchStr) => ({
  type: Actions.SEARCH_ADVERTS_BY_MILEAGE,
  payload: { searchStr, by: "mileage" },
});

export const goSearchByCityAction = (searchStr) => ({
  type: Actions.SEARCH_ADVERTS_BY_CITY,
  payload: { searchStr, by: "city" },
});

export const goSearchByOtherAction = (searchStr) => ({
  type: Actions.SEARCH_ADVERTS_BY_OTHER,
  payload: { searchStr, by: "other" },
});
