import React, { useEffect } from "react";
import "../../styles/TopNavbar.css";
import { FaUser } from "react-icons/fa";
import ViewButton from "./buttons/ViewButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGOUT } from "../../types/AuthTypes";
import { getUserDetails } from "../../actions/loginAction";

const TopNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);
  return (
    <div className="top-nav-container">
      <div className="user-container">
        <FaUser />

        <p>
          {state.userDetails?.firstname + " " + state.userDetails?.lastname}
        </p>
      </div>
      <ViewButton
        text="Logout"
        handleClick={() => {
          dispatch({ type: LOGOUT });
          navigate("/login");
        }}
      />
    </div>
  );
};

export default TopNavbar;
