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
