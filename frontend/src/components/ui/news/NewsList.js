import React, { useEffect } from "react";
import "../../../styles/News.css";
import ViewButton from "../buttons/ViewButton";
import DeleteButton from "../buttons/DeleteButton";
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
            <img
              src="https://news-codewithnazim.vercel.app/static/media/Blog.dec5283b.png"
              alt=""
            />
            <div className="news-body">
              <h3 className="news-title">{item.title}</h3>

              <div className="news-body-group">
                <label htmlFor="">Written by: </label>
                <p>Lucy Smith</p>
              </div>

              <div className="news-body-group">
                <label htmlFor="">Created at: </label>
                <p>2 days ago</p>
              </div>

              {/* <p>{item.desc}</p> */}
              <div className="button-group">
                <ViewButton text="More details" />
                <ViewButton text="Edit" />
                <DeleteButton text="Delete" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NewsList;
