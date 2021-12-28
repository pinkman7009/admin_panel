import React, { useState } from "react";
import ViewButton from "../buttons/ViewButton";
import DeleteButton from "../buttons/DeleteButton";
import FilterBar from "../FilterBar";
import { useDispatch, useSelector } from "react-redux";
import { denyUserNews, approveUserNews } from "../../../actions/newsAction";
import { useNavigate } from "react-router-dom";

const UserNewsTable = ({ userNews, pendingNews }) => {
  const filterOptions = [
    {
      title: "Title",
      value: "title",
    },
    {
      title: "Author",
      value: "author",
    },
    {
      title: "Category",
      value: "category",
    },
    {
      title: "Country",
      value: "country",
    },
    {
      title: "State",
      value: "state",
    },
    {
      title: "City",
      value: "city",
    },

    {
      title: "Status",
      value: "status",
    },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filterValue, setFilterValue] = useState(filterOptions[0].value);
  const [filterText, setFilterText] = useState("");

  if (filterText) {
    if (filterValue === "category") {
      userNews = userNews.filter((item) =>
        item.category.value?.toLowerCase().includes(filterText)
      );
    } else {
      userNews = userNews.filter((item) =>
        item[filterValue]?.toLowerCase().includes(filterText)
      );
    }
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
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Country</th>
            <th>State</th>
            <th>City</th>
            <th>Options</th>
          </tr>
        </thead>

        <tbody>
          {userNews.map((item, index) => {
            return (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.category.value}</td>
                <td>{item.country}</td>
                <td>{item.state}</td>
                <td>{item.city}</td>
                <td>
                  <div className="button-group">
                    <ViewButton
                      text="View More"
                      handleClick={() => navigate(`/usernews/view/${item._id}`)}
                    />
                    {pendingNews === true && (
                      <>
                        <ViewButton
                          text="Approve"
                          handleClick={() =>
                            dispatch(approveUserNews(item._id))
                          }
                        />
                        <DeleteButton
                          text="Deny"
                          handleClick={() => dispatch(denyUserNews(item._id))}
                        />
                      </>
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

export default UserNewsTable;
