import { combineReducers } from "redux";
import userReducer from "./Slices/userSlice";

export default combineReducers({
  users: userReducer,
});
