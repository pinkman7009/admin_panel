import React from "react";
import "../../styles/Dashboard.css";
import LeftNavbar from "../../components/ui/LeftNavbar";
import DashboardWindow from "../../components/ui/dashboard/DashboardWindow";
import Modal from "../../components/ui/Modal";
import { useDispatch, useSelector } from "react-redux";

const Mainscreen = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);

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
      {state.modal !== null ? (
        <Modal title={state.modal.title} body={state.modal.body} />
      ) : null}
    </div>
  );
};

export default Mainscreen;
