import axios from "axios";
import { GET_SETTINGS } from "../types/SettingsTypes";

export const getSettings = () => async (dispatch) => {
  const res = await axios.get("/api/settings");

  const settings = res.data.data[0];

  dispatch({ type: GET_SETTINGS, payload: settings });
};
