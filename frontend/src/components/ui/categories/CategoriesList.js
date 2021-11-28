import React from "react";
import "../../../styles/Categories.css";
import ViewButton from "../buttons/ViewButton";
import DeleteButton from "../buttons/DeleteButton";
import { deleteCategory } from "../../../actions/categoryActions";
import { useDispatch } from "react-redux";
import { OPEN_MODAL, CLOSE_MODAL } from "../../../types/modalTypes";
import { useNavigate } from "react-router-dom";

const CategoriesList = ({ categories }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (item) => {
    dispatch({
      type: OPEN_MODAL,
      payload: {
        title: `delete category ${item.value}`,
        handleClick: () => {
          dispatch(deleteCategory(item._id));
          dispatch({ type: CLOSE_MODAL });
        },
      },
    });
  };
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
        {categories.map((item, index) => {
          return (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.value}</td>
              <td>
                <div className="button-group">
                  <ViewButton
                    text="Edit"
                    handleClick={() =>
                      navigate(`/categories/modal/${item._id}`)
                    }
                  />
                  <DeleteButton
                    text="Delete"
                    handleClick={() => handleDelete(item)}
                  />
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
