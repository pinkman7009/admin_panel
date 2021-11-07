import React, { useState } from "react";
import Navbar from "../../components/authcomponents/Navbar";
import "../../styles/Login.css";

const Signup = () => {
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });

    const { firstname, lastname, email, password } = form;

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="head">
            <Navbar />

            <form className="box" onSubmit={onSubmit}>
                <h1>Sign Up</h1>
                <div className="head-box">
                    <div className="subbox">
                        <h4>First Name</h4>
                        <input
                            className=""
                            type="text"
                            name="firstname"
                            value={firstname}
                            onChange={onChange}
                            placeholder="First Name"
                        />
                    </div>
                    <div className="subbox">
                        <h4>Last Name</h4>
                        <input
                            className=""
                            type="text"
                            name="lastname"
                            value={lastname}
                            onChange={onChange}
                            placeholder="Last Name"
                        />
                    </div>
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
                            Sign Up
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Signup;
