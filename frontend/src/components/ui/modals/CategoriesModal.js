import React, { useState, useEffect } from "react";
import "../../../styles/Modal.css";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "../../../types/modalTypes";
import {
  addCategories,
  fetchCategoryById,
  updateCategory,
} from "../../../actions/categoryActions";
import SaveButton from "../buttons/SaveButton";
import ViewButton from "../buttons/ViewButton";
import { useNavigate, useParams } from "react-router-dom";

const CategoriesModal = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const params = useParams();

  const [form, setForm] = useState({});
  const [updateData, setUpdateData] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      const category = await dispatch(fetchCategoryById(params.id));

      setForm(category);
    };

    if (params.id) {
      fetchCategory();
      setUpdateData(true);
    }
  }, []);

  const { value } = form;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (updateData === false) {
      dispatch(addCategories(form));
    } else {
      dispatch(updateCategory(form, params.id));
    }
    dispatch({ type: CLOSE_MODAL });
    navigate("/categories");
  };
  const closeModal = () => {
    // dispatch({ type: CLOSE_MODAL, payload: null });
    navigate("/categories");
  };

  return (
    <div className="modal-container">
      <div className="modal-wrapper">
        <ViewButton
          handleClick={closeModal}
          text="Go Back"
          className="go-back-btn"
        />
        <h3 className="modal-title">
          {updateData === false ? "Add" : "Update"} Category
        </h3>
        <input
          name="value"
          type="text"
          placeholder="Category name"
          className="modal-input"
          value={value}
          onChange={handleChange}
        />
        <SaveButton handleClick={handleSubmit} />
      </div>
    </div>
  );
};

export default CategoriesModal;
