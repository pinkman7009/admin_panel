import { OPEN_MODAL } from "../types/modalTypes";

export const createModal = (title, body) => (dispatch) => {
  dispatch({ type: OPEN_MODAL, payload: { title, body } });
};
