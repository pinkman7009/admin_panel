import { GET_CATEGORIES } from "../types/categoryTypes";
import axios from "axios";

const fetchSubCategories = async (id) => {
  try {
    const res = await axios.get(`/api/subcategories/${id}`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCategories = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/categories");

    const categories = res.data;

    const updatedCategories = await Promise.all(
      categories.map(async (item) => {
        const subs = await fetchSubCategories(item._id);
        return {
          ...item,
          subcategories: subs,
        };
      })
    );

    console.log({ updatedCategories });
    dispatch({ type: GET_CATEGORIES, payload: updatedCategories });

    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const addCategories = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };

    const res = await axios.post("/api/categories", formData, config);
    dispatch(fetchCategories());
  } catch (error) {
    console.log(error);
  }
};