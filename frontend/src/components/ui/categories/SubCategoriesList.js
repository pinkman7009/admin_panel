import React from "react";
import "../../../styles/Categories.css";

const SubCategoriesList = ({ subcategories }) => {
  return (
    <div>
      {subcategories.length === 0 ? (
        <p>No subcategories added yet</p>
      ) : (
        subcategories?.map((item) => {
          return (
            <div key={item._id} className="subcategory-item">
              {item.value}
            </div>
          );
        })
      )}
    </div>
  );
};

export default SubCategoriesList;
