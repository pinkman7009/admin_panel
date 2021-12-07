import React, { useEffect } from "react";
import "../../../styles/Categories.css";
import "../../../styles/Modal.css";
import CategoriesList from "./CategoriesList";
import AddButton from "../buttons/AddButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../actions/categoryActions";
import { useNavigate } from "react-router-dom";

const CategoriesSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = useSelector((state) => state);

  useEffect(() => {
    if (!state.categories) dispatch(fetchCategories());
  }, []);

  const handleClick = () => {
    navigate("/categories/modal");
  };

  const updatedCategories = state.categories?.filter((item) =>
    state.userDetails?.categories_permissions.some(
      (ele) => ele.category === item._id
    )
  );
  return (
    <div className="categories-container">
      <div className="categories-list">
        <div className="categories-list-header">
          <h3>Categories</h3>
          <AddButton resource="Category" handleClick={handleClick} />
        </div>

        {updatedCategories && <CategoriesList categories={updatedCategories} />}
      </div>
    </div>
  );
};

export default CategoriesSection;
