import { login } from "./loginAction";
import axios from "axios";

export const register = (formData) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "Application/json",
        },
    };

    try {
        const res = await axios.post("/api/users", formData, config);

        const newformData = {
            email: formData.email,
            password: formData.password,
        };
        console.log({ res });

        dispatch(login(newformData));
    } catch (err) {
        console.error(err);
    }
};
