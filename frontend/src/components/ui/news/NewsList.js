import React, { useState, useEffect } from "react";
import "../../../styles/News.css";
import { useDispatch, useSelector } from "react-redux";
import { getNews, deleteNews } from "../../../actions/newsAction";
import { OPEN_MODAL, CLOSE_MODAL } from "../../../types/modalTypes";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../../actions/loginAction";
import ViewButton from "../buttons/ViewButton";
import DeleteButton from "../buttons/DeleteButton";
import FilterBar from "../FilterBar";

const NewsList = () => {
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

  const state = useSelector((state) => state);

  useEffect(() => {
    if (!state.news) dispatch(getNews());
    if (!state.userDetails) dispatch(getUserDetails());
  }, []);

  let adminNews = state.news?.filter((item) =>
    state.userDetails?.categories_permissions.some(
      (eachCategory) => eachCategory.category === item.category._id
    )
  );

  const handleDelete = (item) => {
    dispatch({
      type: OPEN_MODAL,
      payload: {
        title: `delete news ${item.title}`,
        handleClick: () => {
          dispatch(deleteNews(item._id));
          dispatch({ type: CLOSE_MODAL });
        },
      },
    });
  };

  if (filterText) {
    if (filterValue === "category") {
      adminNews = adminNews.filter((item) =>
        item.category.value?.toLowerCase().includes(filterText)
      );
    } else {
      adminNews = adminNews.filter((item) =>
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
            <th>Status</th>
            <th>Options</th>
          </tr>
        </thead>

        <tbody>
          {adminNews?.map((item, index) => {
            return (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.category?.value}</td>
                <td>{item.country}</td>
                <td>{item.state}</td>
                <td>{item.city}</td>
                <td>{item.status}</td>
                <td>
                  <div className="button-group">
                    <ViewButton
                      text="Edit"
                      handleClick={() => navigate(`/news/modal/${item._id}`)}
                    />
                    <ViewButton
                      text="View More"
                      handleClick={() => navigate(`/news/view/${item._id}`)}
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

export default NewsList;
