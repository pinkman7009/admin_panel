import React from "react";
import ViewButton from "../buttons/ViewButton";
import DeleteButton from "../buttons/DeleteButton";
import { deleteUser } from "../../../actions/roleAction";
import { useDispatch } from "react-redux";
import { OPEN_MODAL, CLOSE_MODAL } from "../../../types/modalTypes";

const RoleList = ({ roles }) => {
  const adminRoles = roles?.filter((item) => item.role === 0);

  const dispatch = useDispatch();

  const handleDelete = (item) => {
    dispatch({
      type: OPEN_MODAL,
      payload: {
        title: "delete role",
        handleClick: () => {
          dispatch(deleteUser(item._id));
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
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Role Title</th>
          <th>Options</th>
        </tr>
      </thead>

      <tbody>
        {adminRoles?.map((item, index) => {
          return (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.firstname}</td>
              <td>{item.lastname}</td>
              <td>{item.email}</td>
              <td>{item.role === 0 ? "Admin" : "Not Admin"}</td>
              <td>
                <div className="button-group">
                  <ViewButton text="Edit" />
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

export default RoleList;
