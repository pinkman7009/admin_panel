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

const RatingsList = () => {
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
      title: "Likes",
      value: "likes",
    },
    {
      title: "Comments",
      value: "comments",
    },
    {
      title: "Shares",
      value: "shares",
    },
  ];
  const dispatch = useDispatch();

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

  if (filterText) {
    if (filterValue === "category") {
      adminNews = adminNews.filter((item) =>
        item.category.value?.toLowerCase().includes(filterText)
      );
    } else if (filterValue === "likes") {
      adminNews = adminNews.filter((item) => item.likes.length == filterText);
    } else if (filterValue === "comments") {
      adminNews = adminNews.filter(
        (item) => item.comments.length == filterText
      );
    } else if (filterValue === "shares") {
      adminNews = adminNews.filter((item) => item.shares == filterText);
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
            <th>Likes</th>
            <th>Comments</th>
            <th>Shares</th>
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
                <td>{item.likes?.length}</td>
                <td>{item.comments?.length}</td>
                <td>{item.shares}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default RatingsList;
