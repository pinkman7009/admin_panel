import React, { useEffect } from "react";
import "../../../styles/News.css";
import ViewButton from "../buttons/ViewButton";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../../actions/newsAction";

const NewsList = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(getNews());
  }, []);
  return (
    <div className="news-list">
      {state.news?.map((item) => {
        return (
          <div key={item.id} className="news-item">
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <ViewButton text="View" />
          </div>
        );
      })}
    </div>
  );
};

export default NewsList;
