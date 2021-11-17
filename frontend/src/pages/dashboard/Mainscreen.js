import React from "react";
import "../../styles/Dashboard.css";
import LeftNavbar from "../../components/ui/LeftNavbar";
import DashboardWindow from "../../components/ui/dashboard/DashboardWindow";

const Mainscreen = () => {
  const adminLinks = [
    {
      title: "Dashboard",
      route: "/dashboard",
    },
    {
      title: "Manage Access",
      route: "/access",
    },
    {
      title: "Categories",
      route: "/categories",
    },
    {
      title: "Customer Details",
      route: "/customerdetails",
    },
    {
      title: "News",
      route: "/news",
    },
    {
      title: "Memberships",
      route: "/memberships",
    },
  ];
  return (
    <div className="main-window">
      <LeftNavbar links={adminLinks} />
      <DashboardWindow />
    </div>
  );
};

export default Mainscreen;
