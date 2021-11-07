import React from "react";
import AddButton from "../buttons/AddButton";
import SubCategoriesList from "./SubCategoriesList";

const SubCategories = ({ subcategories }) => {
  return (
    <div className="subcategory-container">
      <div className="categories-list-header">
        <h4>Sub Categories</h4>
        <AddButton resource="Subcategory" />
      </div>
      <SubCategoriesList subcategories={subcategories} />
    </div>
  );
};

export default SubCategories;
