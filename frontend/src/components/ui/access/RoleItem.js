import React from "react";
import ViewButton from "../buttons/ViewButton";
import DeleteButton from "../buttons/DeleteButton";
import { FaUser } from "react-icons/fa";
import { deleteUser } from "../../../actions/roleAction";
import { useDispatch } from "react-redux";

const RoleItem = ({ role }) => {
  const dispatch = useDispatch();
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
          <DeleteButton
            handleClick={() => dispatch(deleteUser(role._id))}
            text="Delete"
          />
        </div>
      </div>
      <div className="user-avatar">
        <FaUser />
      </div>
    </div>
  );
};

export default RoleItem;
