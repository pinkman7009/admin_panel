import React from "react";
import "../../../styles/Categories.css";
import ViewButton from "../buttons/ViewButton";
import DeleteButton from "../buttons/DeleteButton";

const CategoriesList = ({ categories }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Category Name</th>
          <th>Options</th>
        </tr>
      </thead>

      <tbody>
        {categories?.map((item, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td>{item.value}</td>
              <td>
                <div className="button-group">
                  <ViewButton text="Edit" />
                  <DeleteButton text="Delete" />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CategoriesList;
