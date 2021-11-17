import React from "react";
import CategoryItem from "./CategoryItem";

const CategoriesList = ({ categories }) => {
  return (
    <div className="category-item-list">
      {categories?.map((item) => {
        return <CategoryItem key={item.id} category={item} />;
      })}
    </div>
  );
};

export default CategoriesList;
