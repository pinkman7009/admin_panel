import { GET_ROLES } from "../types/roleTypes";
import axios from "axios";

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/manageaccess");

    dispatch({ type: GET_ROLES, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const getUserById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/users/${id}`);

    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const blockUser = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/users/block/${id}`);
    dispatch(getUsers());
  } catch (err) {
    console.error(err);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/users/${id}`);
    dispatch(getUsers());
  } catch (err) {
    console.error(err);
  }
};
