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

  console.log(state);

  const adminLinks = [
    {
      title: "Dashboard",
      route: "/dashboard",
    },
    {
      title: "Customer Details",
      route: "/customerdetails",
    },
  ];

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
    adminLinks.push(
      {
        title: "User News",
        route: "/usernews",
      },
      {
        title: "News",
        route: "/news",
      }
    );
  if (state.userDetails?.permissions.includes("MEMBERSHIP_PLAN"))
    adminLinks.push({
      title: "Memberships",
      route: "/memberships",
    });

  return (
    <div className="main-window">
      <LeftNavbar links={adminLinks} />
      <DashboardWindow />
    </div>
  );
};

export default Mainscreen;
