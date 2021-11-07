import React, { useState } from "react";
import Navbar from "../../components/authcomponents/Navbar";
import "../../styles/Login.css";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const { email, password } = form;

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.name });
    };

    const onSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="head">
            <Navbar />

            <form className="box" onSubmit={onSubmit}>
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
                        <button className="" type="submit">
                            Log In
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
