import React, { useEffect } from "react";
import "../../styles/Dashboard.css";
import LeftNavbar from "../../components/ui/LeftNavbar";
import DashboardWindow from "../../components/ui/dashboard/DashboardWindow";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../actions/loginAction";

const Mainscreen = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  useEffect(() => {
    if (!state.userDetails) dispatch(getUserDetails());
  }, []);

  const adminLinks = [
    {
      title: "Dashboard",
      route: "/",
    },
    {
      title: "Channels",
      route: "/channels",
    },
    {
      title: "Ratings",
      route: "/ratings",
    },
  ];

  if (state.userDetails?.permissions.includes("CUSTOMER_DETAILS"))
    adminLinks.push({
      title: "Customer Details",
      route: "/customerdetails",
    });

  if (state.userDetails?.permissions.includes("MANAGE_ACCESS"))
    adminLinks.push({
      title: "Manage Role",
      route: "/access",
    });
  if (state.userDetails?.permissions.includes("CATEGORIES"))
    adminLinks.push({
      title: "Categories",
      route: "/categories",
    });
  if (state.userDetails?.permissions.includes("NEWS"))
    adminLinks.push({
      title: "News",
      route: "/news",
    });
  if (state.userDetails?.permissions.includes("NEWS_APPROVAL"))
    adminLinks.push({
      title: "News Approval",
      route: "/usernews",
    });
  if (state.userDetails?.permissions.includes("MEMBERSHIP_PLAN"))
    adminLinks.push({
      title: "Memberships",
      route: "/memberships",
    });
  if (state.userDetails?.permissions.includes("SETTINGS"))
    adminLinks.push({
      title: "Settings",
      route: "/settings",
    });

  return (
    <div className="main-window">
      <LeftNavbar links={adminLinks} />
      <DashboardWindow />
    </div>
  );
};

export default Mainscreen;
