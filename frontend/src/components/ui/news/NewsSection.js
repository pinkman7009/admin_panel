import React, { useState } from "react";
import "../../../styles/News.css";
import AddButton from "../buttons/AddButton";
import SaveButton from "../buttons/SaveButton";
import { useDispatch } from "react-redux";
import { OPEN_MODAL, CLOSE_MODAL } from "../../../types/modalTypes";
import NewsList from "./NewsList";
import { addNews } from "../../../actions/newsAction";

const ModalBody = () => {
    const dispatch = useDispatch();

    const [form, setForm] = useState({});

    const {
        title,
        author,
        desc,
        desc2,
        image,
        country,
        city,
        state,
        category,
    } = form;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addNews(form));
        dispatch({ type: CLOSE_MODAL });
    };

    return (
        <>
            <div className="form-group">
                <label htmlFor="">Upload Head Image</label>
                <input type="file" />
            </div>
            <input
                name="title"
                type="text"
                placeholder="Enter title"
                className="modal-input"
                onChange={handleChange}
                value={title}
            />
            <input
                name="author"
                type="text"
                placeholder="Enter Author name"
                className="modal-input"
                onChange={handleChange}
                value={author}
            />
            <div className="form-group">
                <label htmlFor="">Upload Description 1 Image</label>
                <input type="file" />
            </div>

            <textarea
                name="desc"
                type="text"
                placeholder="Enter description 1"
                className="modal-textarea"
                onChange={handleChange}
                value={desc}
            />

            <textarea
                name="desc2"
                type="text"
                placeholder="Enter description 2"
                className="modal-textarea"
                onChange={handleChange}
                value={desc2}
            />
            <input
                name="country"
                type="text"
                placeholder="Country"
                className="modal-input"
                value={country}
                onChange={handleChange}
            />
            <input
                name="state"
                type="text"
                placeholder="State"
                className="modal-input"
                value={state}
                onChange={handleChange}
            />
            <input
                name="city"
                type="text"
                placeholder="City"
                className="modal-input"
                value={city}
                onChange={handleChange}
            />
            <input
                name="category"
                type="text"
                placeholder="Category"
                className="modal-input"
                value={category}
                onChange={handleChange}
            />
            <SaveButton handleClick={handleSubmit} />
        </>
    );
};

const NewsSection = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch({
            type: OPEN_MODAL,
            payload: { title: "Add News", body: <ModalBody /> },
        });
    };
    return (
        <div className="news-container">
            <div className="news-header">
                <h3>News</h3>
                <AddButton resource="News" handleClick={handleClick} />
            </div>
            <NewsList />
        </div>
    );
};

export default NewsSection;
