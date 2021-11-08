import { combineReducers } from "redux";
import { modalReducer } from "./modalReducer";
import { login, getUserDetails } from "./loginReducer";
import { roleReducer } from "./roleReducer";
import { newsReducer } from "./newsReducer";

const reducers = combineReducers({
  modal: modalReducer,
  token: login,
  users: roleReducer,
  userDetails: getUserDetails,
  news: newsReducer,
});

export default reducers;
