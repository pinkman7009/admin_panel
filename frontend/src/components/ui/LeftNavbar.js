import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/LeftNavbar.css";
import {
  MdDashboard,
  MdOutlineAccessibilityNew,
  MdFormatListBulleted,
  MdCardMembership,
} from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { FaUserEdit, FaRegNewspaper } from "react-icons/fa";

const LeftNavbar = ({ links }) => {
  const iconGroup = (title) => {
    if (title === "Dashboard") return <MdDashboard />;
    else if (title === "Manage Role") return <MdOutlineAccessibilityNew />;
    else if (title === "Categories") return <MdFormatListBulleted />;
    else if (title === "Customer Details") return <FaUserEdit />;
    else if (title === "News" || title === "News Approval")
      return <FaRegNewspaper />;
    else if (title === "Memberships") return <MdCardMembership />;
    else if (title === "Settings") return <IoSettings />;
  };
  return (
    <div className="links-wrapper">
      <img src="./logo.png" alt="logo" className="logo-style" />
      <div className="links-list">
        {links.map((link, index) => {
          return (
            <NavLink to={link.route} activeClassName="active" key={index}>
              <div className="link-group">
                {iconGroup(link.title)}
                <p>{link.title}</p>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default LeftNavbar;
