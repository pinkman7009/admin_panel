import React, { useState } from "react";
import ViewButton from "../buttons/ViewButton";
import DeleteButton from "../buttons/DeleteButton";
import FilterBar from "../FilterBar";
import { useDispatch } from "react-redux";
import { blockUser } from "../../../actions/roleAction";
import { OPEN_MODAL, CLOSE_MODAL } from "../../../types/modalTypes";
import { deleteUser } from "../../../actions/roleAction";
import { useNavigate } from "react-router-dom";

const CustomerDetailsList = ({ customers }) => {
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
      title: "Phone",
      value: "phone",
    },
    {
      title: "IP",
      value: "ip",
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filterValue, setFilterValue] = useState(filterOptions[0].value);
  const [filterText, setFilterText] = useState("");

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

  if (filterText) {
    customers = customers.filter((item) =>
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
            <th>Phone</th>
            <th>IP</th>
            <th>Membership</th>
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
                <td>{item.phone ? item.phone : "No phone"}</td>
                <td>{item.ip ? item.ip : "No IP"}</td>
                <td>
                  {item.membership_plan
                    ? item.membership_plan.name
                    : "No membership"}
                </td>
                <td>
                  <div className="button-group">
                    <ViewButton
                      text="Edit"
                      handleClick={() =>
                        navigate(`/customerdetails/modal/${item._id}`)
                      }
                    />
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
    </>
  );
};

export default CustomerDetailsList;
