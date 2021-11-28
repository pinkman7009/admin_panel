import React from "react";
import ViewButton from "../buttons/ViewButton";
import DeleteButton from "../buttons/DeleteButton";
import { FaUser } from "react-icons/fa";
import { deleteUser } from "../../../actions/roleAction";
import { useDispatch } from "react-redux";
import { OPEN_MODAL } from "../../../types/modalTypes";

const RoleItem = ({ role }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch({
      type: OPEN_MODAL,
      payload: {
        title: "delete role",
        handleClick: () => dispatch(deleteUser(role._id)),
      },
    });
  };
  return (
    <div className="role-item">
      <div>
        <h3>
          {" "}
          {role.firstname} {role.lastname}
        </h3>
        <p>{role.email}</p>
        {role.role === 0 ? <p>Admin</p> : <p>Not Admin</p>}
        <div className="button-group">
          <ViewButton text="Edit" />
          <DeleteButton handleClick={handleDelete} text="Delete" />
        </div>
      </div>
      <div className="user-avatar">
        <FaUser />
      </div>
    </div>
  );
};

export default RoleItem;
