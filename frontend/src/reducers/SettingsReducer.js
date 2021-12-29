import { GET_SETTINGS } from "../types/SettingsTypes";

export const settingsReducer = (state = null, action) => {
  switch (action.type) {
    case GET_SETTINGS:
      return action.payload;
    default:
      return state;
  }
};
