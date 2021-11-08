import { login } from "./loginAction";
import axios from "axios";
import { getUsers } from "./roleAction";

export const register = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };

  try {
    formData.role = 0;
    const res = await axios.post("/api/users", formData, config);

    const newformData = {
      email: formData.email,
      password: formData.password,
    };
    dispatch(login(newformData));
  } catch (err) {
    console.error(err);
  }
};

export const addRole = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "Application/json",
    },
  };

  try {
    formData.role = 0;
    const res = await axios.post("/api/users", formData, config);

    dispatch(getUsers());
  } catch (err) {
    console.error(err);
  }
};
