import {combineReducers} from "redux";
import userReducer from "./userReducer.jsx";
import venueReducer from "./venueReducer.jsx";

const mainReducer = combineReducers({
  user: userReducer,
  venues: venueReducer
});

export default mainReducer;
