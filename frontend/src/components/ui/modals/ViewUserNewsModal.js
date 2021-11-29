import React, { useState, useEffect } from "react";
import "../../../styles/Modal.css";
import { useDispatch, useSelector } from "react-redux";
import { getNewsById } from "../../../actions/newsAction";
import ViewButton from "../buttons/ViewButton";
import { useNavigate, useParams } from "react-router-dom";

const ViewUserNewsModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [form, setForm] = useState({});

  const storedState = useSelector((state) => state);

  useEffect(() => {
    const fetchNewsData = async () => {
      const news = await dispatch(getNewsById(params.id));

      setForm(news);
    };

    if (params.id) {
      fetchNewsData();
    }
  }, []);

  const { title, author, desc, desc2, country, city, state, category } = form;

  const closeModal = () => {
    // dispatch({ type: CLOSE_MODAL, payload: null });
    navigate("/usernews");
  };

  return (
    <div className="modal-container">
      <div className="modal-wrapper">
        <ViewButton handleClick={closeModal} text="Go Back" />

        <div className="news-modal-content">
          <h3 className="modal-title">{title}</h3>
          <img
            src="https://us.123rf.com/450wm/alhovik/alhovik1709/alhovik170900031/86481591-breaking-news-background-world-global-tv-banner-pubblicitari.jpg?ver=6"
            alt=""
          />

          <div className="news-content-item">
            <h4>Author</h4>
            <p>{author}</p>
          </div>

          <div className="news-content-item">
            <h4>Category</h4>
            <p>{category?.value}</p>
          </div>

          <img
            src="https://us.123rf.com/450wm/alhovik/alhovik1709/alhovik170900031/86481591-breaking-news-background-world-global-tv-banner-pubblicitari.jpg?ver=6"
            alt=""
          />

          <div className="news-content-item">
            <h4>Description 1</h4>
            <p>{desc && desc}</p>
          </div>

          <div className="news-content-item">
            <h4>Description 2</h4>
            <p>{desc2 && desc2}</p>
          </div>

          <div className="news-content-item">
            <h4>Country</h4>
            <p>{country}</p>
          </div>

          <div className="news-content-item">
            <h4>State</h4>
            <p>{state}</p>
          </div>

          <div className="news-content-item">
            <h4>City</h4>
            <p>{city}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserNewsModal;
