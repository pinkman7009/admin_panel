import { GET_ROLES } from "../types/roleTypes";
import axios from "axios";

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/users");

    dispatch({ type: GET_ROLES, payload: res.data });

    console.log({ res });
  } catch (err) {
    console.error(err);
  }
};
