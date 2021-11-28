import React, { useState, useEffect } from "react";
import "../../../styles/News.css";
import ViewButton from "../buttons/ViewButton";
import DeleteButton from "../buttons/DeleteButton";
import { useDispatch, useSelector } from "react-redux";
import {
  denyUserNews,
  getNews,
  approveUserNews,
} from "../../../actions/newsAction";

import UserNewsTable from "./UserNewsTable";

const UserNewsList = () => {
  const dispatch = useDispatch();

  const [pending, setPending] = useState(true);
  const [approved, setApproved] = useState(false);

  const state = useSelector((state) => state);

  useEffect(() => {
    if (!state.news) dispatch(getNews());
  }, []);

  const userNews = state.news?.filter((item) => item.user.role === 1);

  const pendingNews = userNews?.filter((item) => item.status === "Pending");
  const approvedNews = userNews?.filter((item) => item.status === "Accepted");
  const deniedNews = userNews?.filter((item) => item.status === "Denied");

  return (
    <>
      <div className="button-group">
        <button
          className={pending === true ? "outline-btn active" : "outline-btn"}
          onClick={() => {
            setPending(true);
            setApproved(false);
          }}
        >
          Pending
        </button>
        <button
          className={approved === true ? "outline-btn active" : "outline-btn"}
          onClick={() => {
            setPending(false);
            setApproved(true);
          }}
        >
          Approved
        </button>
        <button
          className={
            approved === false && pending === false
              ? "outline-btn active"
              : "outline-btn"
          }
          onClick={() => {
            setPending(false);
            setApproved(false);
          }}
        >
          Denied
        </button>
      </div>
      {pending === true ? (
        <UserNewsTable userNews={pendingNews} />
      ) : approved === true ? (
        <UserNewsTable userNews={approvedNews} />
      ) : (
        <UserNewsTable userNews={deniedNews} />
      )}
    </>
  );
};

export default UserNewsList;
