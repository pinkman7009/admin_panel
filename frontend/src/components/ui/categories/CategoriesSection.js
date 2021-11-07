import React from "react";
import "../../../styles/Categories.css";
import "../../../styles/Modal.css";
import CategoriesList from "./CategoriesList";
import AddButton from "../buttons/AddButton";
import SaveButton from "../buttons/SaveButton";
import { useDispatch } from "react-redux";
import { OPEN_MODAL } from "../../../types/modalTypes";

const CategoriesSection = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const modalBody = () => {
    return (
      <>
        <input
          type="text"
          placeholder="Category name"
          className="modal-input"
        />
        <SaveButton handleClick={handleSubmit} />
      </>
    );
  };
  const dispatch = useDispatch();
  const categories = [
    {
      id: 1,
      title: "Category 1",
    },
    {
      id: 2,
      title: "Category 2",
    },
    {
      id: 3,
      title: "Category 3",
    },
    {
      id: 4,
      title: "Category 4",
    },
    {
      id: 5,
      title: "Category 5",
    },
    {
      id: 6,
      title: "Category 6",
    },
  ];

  const handleClick = () => {
    dispatch({
      type: OPEN_MODAL,
      payload: { title: "Add Category", body: modalBody },
    });
  };
  return (
    <div className="categories-container">
      <div className="categories-list">
        <div className="categories-list-header">
          <h3>Categories</h3>
          <AddButton resource="Category" handleClick={handleClick} />
        </div>

        <CategoriesList categories={categories} />
      </div>
    </div>
  );
};

export default CategoriesSection;
