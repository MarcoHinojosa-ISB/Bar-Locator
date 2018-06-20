export function saveLastSearch(location, venueList){
  return {
    type: "SAVE_LAST_SEARCH",
    location,
    venueList
  }
}

export function clearSearchData(){
  return {
    type: "CLEAR_SEARCH_DATA"
  }
}
