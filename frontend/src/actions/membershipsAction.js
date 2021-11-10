import { GET_MEMBERSHIPS } from "../types/membershipsTypes";
import axios from "axios";

export const fetchMemberships = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/plans");

    dispatch({ type: GET_MEMBERSHIPS, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const addMemberships = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };

  try {
    const res = await axios.post("/api/plans", formData, config);

    dispatch(fetchMemberships());
  } catch (err) {
    console.error(err);
  }
};
