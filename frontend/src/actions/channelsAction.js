import axios from "axios";
import { GET_CHANNELS } from "../types/newsTypes";

export const getChannels = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/channels");

    dispatch({ type: GET_CHANNELS, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};
