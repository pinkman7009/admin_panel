import React from "react";
import "../../../styles/Categories.css";

const SubCategoriesList = ({ subcategories }) => {
  return (
    <div>
      {subcategories.map((item) => {
        return (
          <div key={item.id} className="subcategory-item">
            {item.title}
          </div>
        );
      })}
    </div>
  );
};

export default SubCategoriesList;
