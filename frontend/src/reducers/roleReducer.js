import { GET_ROLES } from "../types/roleTypes";

export const roleReducer = (state = null, action) => {
  switch (action.type) {
    case GET_ROLES:
      return action.payload;
    default:
      return state;
  }
};
