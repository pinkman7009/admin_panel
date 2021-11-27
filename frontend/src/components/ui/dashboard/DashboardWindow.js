import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import TopNavbar from "../TopNavbar";
import DashboardSection from "./DashboardSection";
import ManageAccessSection from "../access/ManageAccessSection";
import CategoriesSection from "../categories/CategoriesSection";
import CustomerDetailsSection from "../customerdetails/CustomerDetailsSection";
import NewsSection from "../news/NewsSection";
import MembershipsSection from "../memberships/MembershipsSection";
import "../../../styles/Dashboard.css";
import Modal from "../../ui/Modal";
import AccessModal from "../modals/AccessModal";
import CategoriesModal from "../modals/CategoriesModal";
import NewsModal from "../modals/NewsModal";

import { useDispatch, useSelector } from "react-redux";
import MembershipsModal from "../modals/MembershipsModal";

const DashboardWindow = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state);

  return (
    <div className="main-window-right">
      <TopNavbar />
      <div className="main-window-right-bottom">
        <Routes>
          <Route exact path="/dashboard" element={<DashboardSection />} />
          <Route exact path="/access" element={<ManageAccessSection />} />
          <Route exact path="/categories" element={<CategoriesSection />} />
          <Route
            exact
            path="/customerdetails"
            element={<CustomerDetailsSection />}
          />
          <Route exact path="/news" element={<NewsSection />} />
          <Route exact path="/memberships" element={<MembershipsSection />} />

          {/* Modals */}
          <Route exact path="/access/modal" element={<AccessModal />} />
          <Route exact path="/categories/modal" element={<CategoriesModal />} />
          <Route exact path="/news/modal" element={<NewsModal />} />
          <Route
            exact
            path="/memberships/modal"
            element={<MembershipsModal />}
          />
        </Routes>
        {state.modal !== null ? (
          <Modal title={state.modal.title} body={state.modal.body} />
        ) : null}
      </div>
    </div>
  );
};

export default DashboardWindow;
