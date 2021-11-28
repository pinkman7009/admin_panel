import { ADD_NEWS, GET_NEWS } from "../types/newsTypes";
import axios from "axios";

export const getNews = () => async (dispatch, token) => {
  try {
    const res = await axios.get("/api/news");

    dispatch({ type: GET_NEWS, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const getNewsById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/news/${id}`);

    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const addNews = (formData) => async (dispatch, token) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };

  try {
    const res = await axios.post("/api/news", formData, config);

    dispatch(getNews());
  } catch (err) {
    console.error(err);
  }
};

export const deleteNews = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/news/${id}`);

    dispatch(getNews());
  } catch (err) {
    console.error(err);
  }
};

export const updateNews = (formData, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };

    const res = await axios.put(`/api/news/${id}`, formData, config);

    dispatch(getNews());
  } catch (err) {
    console.error(err);
  }
};

export const approveUserNews = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };
    const body = {
      status: "Accepted",
    };
    const res = await axios.put(`/api/news/${id}`, body, config);

    dispatch(getNews());
  } catch (err) {
    console.error(err);
  }
};

export const denyUserNews = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };
    const body = {
      status: "Denied",
    };
    const res = await axios.put(`/api/news/${id}`, body, config);

    dispatch(getNews());
  } catch (err) {
    console.error(err);
  }
};
