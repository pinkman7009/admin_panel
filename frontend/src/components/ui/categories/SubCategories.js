import React from "react";
import AddButton from "../buttons/AddButton";
import SubCategoriesList from "./SubCategoriesList";
import SaveButton from "../buttons/SaveButton";
import { useDispatch } from "react-redux";
import { OPEN_MODAL } from "../../../types/modalTypes";

const SubCategories = ({ subcategories }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const modalBody = () => {
    return (
      <>
        <input
          type="text"
          placeholder="Subcategory name"
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
      payload: { title: "Add Subcategory", body: modalBody },
    });
  };
  return (
    <div className="subcategory-container">
      <div className="categories-list-header">
        <h4>Sub Categories</h4>
        <AddButton resource="Subcategory" handleClick={handleClick} />
      </div>
      <SubCategoriesList subcategories={subcategories} />
    </div>
  );
};

export default SubCategories;
