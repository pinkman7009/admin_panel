import React, { useState } from "react";
import "../../../styles/Modal.css";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "../../../types/modalTypes";
import { addNews } from "../../../actions/newsAction";
import SaveButton from "../buttons/SaveButton";
import ViewButton from "../buttons/ViewButton";
import { useNavigate } from "react-router-dom";

const NewsModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({});

  const { title, author, desc, desc2, image, country, city, state, category } =
    form;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNews(form));
    navigate("/news");
  };

  const closeModal = () => {
    // dispatch({ type: CLOSE_MODAL, payload: null });
    navigate("/news");
  };

  return (
    <div className="modal-container">
      <div className="modal-wrapper">
        <ViewButton handleClick={closeModal} text="Go Back" />
        <h3 className="modal-title">Add News</h3>
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
          name="author"
          type="text"
          placeholder="Enter Author name"
          className="modal-input"
          onChange={handleChange}
          value={author}
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
          value={desc2}
        />
        <input
          name="country"
          type="text"
          placeholder="Country"
          className="modal-input"
          value={country}
          onChange={handleChange}
        />
        <input
          name="state"
          type="text"
          placeholder="State"
          className="modal-input"
          value={state}
          onChange={handleChange}
        />
        <input
          name="city"
          type="text"
          placeholder="City"
          className="modal-input"
          value={city}
          onChange={handleChange}
        />
        <input
          name="category"
          type="text"
          placeholder="Category"
          className="modal-input"
          value={category}
          onChange={handleChange}
        />
        <SaveButton handleClick={handleSubmit} />
      </div>
    </div>
  );
};

export default NewsModal;
