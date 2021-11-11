import React from "react";
import { Link } from "react-router-dom";
import "../../styles/AuthNavbar.css";

const Navbar = () => {
    return (
        <div className="navbar">
            <div>Admin Panel</div>
            {/* <div>
                <ul>
                    <Link to="/login" style={{ textDecoration: "none" }}>
                        <li>Login</li>
                    </Link>
                    <Link to="/signup" style={{ textDecoration: "none" }}>
                        <li>Sign Up</li>
                    </Link>
                </ul>
            </div> */}
        </div>
    );
};

export default Navbar;
