import React from "react";
import "../../../styles/Categories.css";
import CategoriesList from "./CategoriesList";
import AddButton from "../buttons/AddButton";

const CategoriesSection = () => {
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
  return (
    <div className="categories-container">
      <div className="categories-list">
        <div className="categories-list-header">
          <h3>Categories</h3>
          <AddButton resource="Category" />
        </div>

        <CategoriesList categories={categories} />
      </div>
    </div>
  );
};

export default CategoriesSection;
