import React, { useState } from "react";
import "../../../styles/Categories.css";
import { AiFillCaretDown } from "react-icons/ai";
import SubCategories from "./SubCategories";
import ViewButton from "../buttons/ViewButton";
import DeleteButton from "../buttons/DeleteButton";

const CategoryItem = ({ category }) => {
  const [showSub, setShowSub] = useState(false);

  return (
    <>
      <div className="category-item">
        <div>{category.value}</div>
        {/* <AiFillCaretDown onClick={() => setShowSub(!showSub)} /> */}
        <div className="button-group">
          <ViewButton text="Edit" />
          <DeleteButton text="Delete" />
        </div>
      </div>
      {/* {showSub ? (
        <SubCategories
          id={category._id}
          subcategories={category.subcategories}
        />
      ) : null} */}
    </>
  );
};

export default CategoryItem;
