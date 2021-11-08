import React, { useState } from "react";
import "../../../styles/Categories.css";
import { AiFillCaretDown } from "react-icons/ai";
import SubCategories from "./SubCategories";

const CategoryItem = ({ category }) => {
  const [showSub, setShowSub] = useState(false);

  const subcategories = [
    {
      id: 1,
      title: "Subcategory 1",
    },
    {
      id: 2,
      title: "Subcategory 2",
    },
    {
      id: 3,
      title: "Subcategory 3",
    },
    {
      id: 4,
      title: "Subcategory 4",
    },
  ];
  return (
    <>
      <div className="category-item">
        {category.title}
        <AiFillCaretDown onClick={() => setShowSub(!showSub)} />
      </div>
      {showSub ? <SubCategories subcategories={subcategories} /> : null}
    </>
  );
};

export default CategoryItem;
