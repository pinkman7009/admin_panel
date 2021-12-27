import React, { useState } from "react";
import "../../../styles/Memberships.css";
import ViewButton from "../buttons/ViewButton";
import DeleteButton from "../buttons/DeleteButton";
import FilterBar from "../FilterBar";
import { FaCheck, FaTimes } from "react-icons/fa";
import { OPEN_MODAL, CLOSE_MODAL } from "../../../types/modalTypes";
import { useDispatch } from "react-redux";
import { deletePlan } from "../../../actions/membershipsAction";
import { useNavigate } from "react-router-dom";

const MembershipsList = ({ memberships }) => {
  const filterOptions = [
    {
      title: "Membership Name",
      value: "name",
    },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filterValue, setFilterValue] = useState(filterOptions[0].value);
  const [filterText, setFilterText] = useState("");

  const handleDelete = (item) => {
    dispatch({
      type: OPEN_MODAL,
      payload: {
        title: `delete plan ${item.name}`,
        handleClick: () => {
          dispatch(deletePlan(item._id));
          dispatch({ type: CLOSE_MODAL });
        },
      },
    });
  };

  if (filterText) {
    memberships = memberships.filter((item) =>
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
            <th>Membership Name</th>
            <th>Monthly Price</th>
            <th>Annually Price</th>
            <th>Create Post Limit</th>
            <th>View Post</th>
            <th>Can Comment</th>
            <th>Can Delete Post</th>
            <th>Options</th>
          </tr>
        </thead>

        <tbody>
          {memberships?.map((item, index) => {
            return (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.monthly_price}</td>
                <td>{item.annually_price}</td>
                <td>{item.createPostLimit}</td>
                <td>{item.viewPost ? <FaCheck /> : <FaTimes />}</td>
                <td>{item.canComment ? <FaCheck /> : <FaTimes />}</td>
                <td>{item.canDeletePost ? <FaCheck /> : <FaTimes />}</td>
                <td>
                  <div className="button-group">
                    <ViewButton
                      text="Edit"
                      handleClick={() =>
                        navigate(`/memberships/modal/${item._id}`)
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
    </>
  );
};

export default MembershipsList;
