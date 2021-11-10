import { combineReducers } from "redux";
import { modalReducer } from "./modalReducer";
import { login, getUserDetails } from "./loginReducer";
import { roleReducer } from "./roleReducer";
import { newsReducer } from "./newsReducer";
import { categoryReducer } from "./categoryReducers";
import { membershipsReducer } from "./membershipsReducer";

const reducers = combineReducers({
  modal: modalReducer,
  token: login,
  users: roleReducer,
  userDetails: getUserDetails,
  news: newsReducer,
  categories: categoryReducer,
  memberships: membershipsReducer,
});

export default reducers;
