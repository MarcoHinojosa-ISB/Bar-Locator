const initialState = {
  location: null,
  venueList: null,
}

const venueReducer = function(state = initialState, action){
  switch(action.type){
    case "SAVE_LAST_SEARCH":
      state.location = action.location;
      state.venueList = action.venueList;
      break;
    case "CLEAR_SEARCH_DATA":
      state.location = null;
      state.venueList = null;
      break;
  }

  return state;
}

export default venueReducer;
