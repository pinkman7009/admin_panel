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
      <div className="form-group">
        <label htmlFor="">Upload Head Image</label>
        <input type="file" />
      </div>
      <input
        name="title"
        type="text"
        placeholder="Enter title"
        className="modal-input"
        onChange={handleChange}
        value={title}
      />

      <input
        type="text"
        name="author"
        placeholder="Enter author name"
        className="modal-input"
      />

      <div className="form-group">
        <label htmlFor="">Upload Description 1 Image</label>
        <input type="file" />
      </div>

      <textarea
        name="desc"
        type="text"
        placeholder="Enter description 1"
        className="modal-textarea"
        onChange={handleChange}
        value={desc}
      />

      <textarea
        name="desc2"
        type="text"
        placeholder="Enter description 2"
        className="modal-textarea"
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
      payload: { title: "Add News", body: <ModalBody /> },
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
