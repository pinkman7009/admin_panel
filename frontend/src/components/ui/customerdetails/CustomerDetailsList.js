import React from "react";
import ViewButton from "../buttons/ViewButton";
import DeleteButton from "../buttons/DeleteButton";
import { useDispatch } from "react-redux";
import { blockUser } from "../../../actions/roleAction";
import { OPEN_MODAL, CLOSE_MODAL } from "../../../types/modalTypes";
import { deleteUser } from "../../../actions/roleAction";

const CustomerDetailsList = ({ customers }) => {
  const dispatch = useDispatch();

  const BlockClick = (item) => {
    dispatch({
      type: OPEN_MODAL,
      payload: {
        title: `${item.blockedStatus === true ? "unblock" : "block"} user ${
          item.firstname
        } ${item.lastname}`,
        handleClick: () => {
          dispatch(blockUser(item._id));
          dispatch({ type: CLOSE_MODAL });
        },
      },
    });
  };

  const handleDelete = (item) => {
    dispatch({
      type: OPEN_MODAL,
      payload: {
        title: `delete user ${item.firstname} ${item.lastname}`,
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
          <th>Phone</th>
          <th>Options</th>
        </tr>
      </thead>

      <tbody>
        {customers.map((item, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td>{item.firstname}</td>
              <td>{item.lastname}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>
                <div className="button-group">
                  <ViewButton text="Edit" />
                  <DeleteButton
                    text="Delete"
                    handleClick={() => handleDelete(item)}
                  />
                  {item.blockedStatus ? (
                    <DeleteButton
                      text="UnBlock"
                      handleClick={() => BlockClick(item)}
                    />
                  ) : (
                    <DeleteButton
                      text="Block"
                      handleClick={() => BlockClick(item)}
                    />
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CustomerDetailsList;
