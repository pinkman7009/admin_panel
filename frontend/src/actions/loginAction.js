import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from "../types/AuthTypes";
import axios from "axios";

export const login = (formData) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "Application/json",
        },
    };

    try {
        const res = await axios.post("/api/login", formData, config);

        dispatch({ type: LOGIN_SUCCESS, payload: res });

        console.log({ res });
    } catch (err) {
        console.error(err);
    }
};

export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT });
};
