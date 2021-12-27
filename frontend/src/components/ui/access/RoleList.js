import React, { useState } from "react";
import ViewButton from "../buttons/ViewButton";
import DeleteButton from "../buttons/DeleteButton";
import FilterBar from "../FilterBar";
import { deleteUser } from "../../../actions/roleAction";
import { useDispatch } from "react-redux";
import { OPEN_MODAL, CLOSE_MODAL } from "../../../types/modalTypes";
import { useNavigate } from "react-router-dom";

const RoleList = ({ roles }) => {
  const filterOptions = [
    {
      title: "First Name",
      value: "firstname",
    },
    {
      title: "Last Name",
      value: "lastname",
    },
    {
      title: "Email",
      value: "email",
    },
    {
      title: "Role Title",
      value: "roleTitle",
    },
    {
      title: "IP",
      value: "ip",
    },
  ];
  let adminRoles = roles?.filter((item) => item.role === 0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filterValue, setFilterValue] = useState(filterOptions[0].value);
  const [filterText, setFilterText] = useState("");

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

  if (filterText) {
    adminRoles = adminRoles?.filter((item) =>
      item[filterValue]?.toLowerCase().includes(filterText)
    );
  }
  return (
    <>
      <FilterBar
        filterOptions={filterOptions}
        filterValue={filterValue}
        filterText={filterText}
        setFilterText={setFilterText}
        setFilterValue={setFilterValue}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role Title</th>
            <th>IP</th>
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
                <td>
                  {item.roleTitle
                    ? item.roleTitle
                    : item.role === 0
                    ? "Admin"
                    : "Not Admin"}
                </td>
                <td>{item.ip ? item.ip : "No IP"}</td>

                <td>
                  <div className="button-group">
                    <ViewButton
                      text="Edit"
                      handleClick={() => navigate(`/access/modal/${item._id}`)}
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
    </>
  );
};

export default RoleList;
