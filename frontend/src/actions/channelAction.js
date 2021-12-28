import axios from "axios";
import { GET_A_CHANNEL } from "../types/channelTypes";

export const getChannelbyUserId = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/userId/${id}`);

    const channel = res.data;

    console.log(channel);

    dispatch({ type: GET_A_CHANNEL, payload: channel });
  } catch (error) {
    console.error(error);
  }
};
