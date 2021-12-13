import React, { useState } from "react";
import Navbar from "../../components/authcomponents/Navbar";
import "../../styles/Login.css";
import { login } from "../../actions/loginAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const Login = (props) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
    navigate("/", { replace: false });
  };

  return (
    <div className="head">
      <Navbar />
      <img src="./logo.png" alt="logo" className="logo-style-login" />
      <form className="box">
        <h1>Log In</h1>
        <div className="head-box">
          <div className="subbox">
            <h4>Email</h4>
            <input
              className=""
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Email"
            />
          </div>
          <div className="subbox">
            <h4>Password</h4>
            <input
              className=""
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
            />
          </div>
          <div className="subbox-button">
            <button className="" type="submit" onClick={onSubmit}>
              Log In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
