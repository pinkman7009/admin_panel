import { OPEN_MODAL, CLOSE_MODAL } from "../types/modalTypes";

export const modalReducer = (state = null, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return action.payload;
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
};
