import { GET_A_CHANNEL } from "../types/channelTypes";

export const channelReducer = (state = null, action) => {
  switch (action.type) {
    case GET_A_CHANNEL:
      return action.payload;
    default:
      return state;
  }
};
