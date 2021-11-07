import { combineReducers } from "redux";
import { modalReducer } from "./modalReducer";
import { login } from "./loginReducer";

const reducers = combineReducers({
    modal: modalReducer,
    token: login,
});

export default reducers;
