import React from "react";
import "../../../styles/News.css";
import AddButton from "../buttons/AddButton";
import SaveButton from "../buttons/SaveButton";
import { useDispatch } from "react-redux";
import { OPEN_MODAL } from "../../../types/modalTypes";
import NewsList from "./NewsList";

const NewsSection = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const modalBody = () => {
    return (
      <>
        <input type="text" placeholder="Enter title" className="modal-input" />
        <input type="text" placeholder="Enter URL" className="modal-input" />
        <input
          type="text"
          placeholder="Enter description"
          className="modal-input"
        />

        <SaveButton handleClick={handleSubmit} />
      </>
    );
  };
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({
      type: OPEN_MODAL,
      payload: { title: "Add News", body: modalBody },
    });
  };
  return (
    <div className="news-container">
      <div className="news-header">
        <h3>News</h3>
        <AddButton resource="News" handleClick={handleClick} />
      </div>
      <NewsList />
    </div>
  );
};

export default NewsSection;
