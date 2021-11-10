import { GET_CATEGORIES } from "../types/categoryTypes";

export const categoryReducer = (state = null, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
};
