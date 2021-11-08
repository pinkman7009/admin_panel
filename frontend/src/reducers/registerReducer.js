import { REGISTER_FAIL, REGISTER_SUCCESS } from "../types/AuthTypes";

export const register = (
    user = JSON.parse(localStorage.getItem("token")),
    action
) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            localStorage.setItem("token", action.payload.data.token);
            return JSON.parse(localStorage.getItem("token"));

        case REGISTER_FAIL:
            return null;

        default:
            return user;
    }
};
