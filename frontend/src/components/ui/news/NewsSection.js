import React, { useState } from "react";
import "../../../styles/News.css";
import AddButton from "../buttons/AddButton";
import SaveButton from "../buttons/SaveButton";
import { useDispatch } from "react-redux";
import { OPEN_MODAL, CLOSE_MODAL } from "../../../types/modalTypes";
import NewsList from "./NewsList";
import { addNews } from "../../../actions/newsAction";

const ModalBody = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({});

  const { title, desc, image } = form;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNews(form));
    dispatch({ type: CLOSE_MODAL });
  };

  return (
    <>
      <input
        name="title"
        type="text"
        placeholder="Enter title"
        className="modal-input"
        onChange={handleChange}
        value={title}
      />
      <input
        name="image"
        type="text"
        placeholder="Enter URL"
        className="modal-input"
        onChange={handleChange}
        value={image}
      />
      <input
        name="desc"
        type="text"
        placeholder="Enter description"
        className="modal-input"
        onChange={handleChange}
        value={desc}
      />

      <SaveButton handleClick={handleSubmit} />
    </>
  );
};

const NewsSection = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({
      type: OPEN_MODAL,
      payload: { title: "Add News", body: ModalBody },
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
