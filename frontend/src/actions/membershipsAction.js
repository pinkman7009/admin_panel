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

export const fetchMembershipById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/plans/${id}`);

    return res.data;
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

export const updateMembership = (formData, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };

  try {
    const res = await axios.put(`/api/plans/${id}`, formData, config);

    dispatch(fetchMemberships());
  } catch (err) {
    console.error(err);
  }
};

export const deletePlan = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/plans/${id}`);

    dispatch(fetchMemberships());
  } catch (err) {
    console.error(err);
  }
};
