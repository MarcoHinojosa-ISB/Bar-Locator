export function saveLastSearch(location, venueList){
  return {
    type: "SAVE_LAST_SEARCH",
    location,
    venueList
  }
}

export function removeSearchData(){
  return {
    type: "REMOVE_SEARCH_DATA"
  }
}
