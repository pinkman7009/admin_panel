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

    // const updatedCategories = await Promise.all(
    //   categories.map(async (item) => {
    //     const subs = await fetchSubCategories(item._id);
    //     return {
    //       ...item,
    //       subcategories: subs,
    //     };
    //   })
    // );

    // console.log({ updatedCategories });
    dispatch({ type: GET_CATEGORIES, payload: categories });
  } catch (error) {
    console.log(error);
  }
};

export const fetchCategoryById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/categories/${id}`);

    return res.data;
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

export const updateCategory = (formData, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };

    const res = await axios.put(`/api/categories/${id}`, formData, config);
    dispatch(fetchCategories());
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/categories/${id}`);
    dispatch(fetchCategories());
  } catch (error) {
    console.log(error);
  }
};
