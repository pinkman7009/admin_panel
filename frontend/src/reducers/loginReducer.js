import {
  GET_USER_DETAILS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../types/AuthTypes";

export const login = (user = localStorage.getItem("token"), action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.data.token);
      return localStorage.getItem("token");

    case LOGOUT:
      localStorage.removeItem("token");
      return null;

    default:
      return user;
  }
};

export const getUserDetails = (user = null, action) => {
  switch (action.type) {
    case GET_USER_DETAILS:
      return action.payload;
    default:
      return user;
  }
};
