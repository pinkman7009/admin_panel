import React, { useState } from "react";
import "../../../styles/Categories.css";
import { AiFillCaretDown } from "react-icons/ai";
import SubCategories from "./SubCategories";

const CategoryItem = ({ category }) => {
  const [showSub, setShowSub] = useState(false);

  return (
    <>
      <div className="category-item">
        {category.value}
        <AiFillCaretDown onClick={() => setShowSub(!showSub)} />
      </div>
      {showSub ? (
        <SubCategories
          id={category._id}
          subcategories={category.subcategories}
        />
      ) : null}
    </>
  );
};

export default CategoryItem;
