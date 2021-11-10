import { GET_MEMBERSHIPS } from "../types/membershipsTypes";

export const membershipsReducer = (state = null, action) => {
  switch (action.type) {
    case GET_MEMBERSHIPS:
      return action.payload;
    default:
      return state;
  }
};
