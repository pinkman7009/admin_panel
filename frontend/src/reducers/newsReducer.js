import { GET_NEWS, ADD_NEWS } from "../types/newsTypes";

export const newsReducer = (state = null, action) => {
  switch (action.type) {
    case GET_NEWS:
      return action.payload;
    default:
      return state;
  }
};
