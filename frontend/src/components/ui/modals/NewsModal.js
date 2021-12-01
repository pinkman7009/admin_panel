import React, { useState, useEffect } from "react";
import "../../../styles/Modal.css";
import { useDispatch, useSelector } from "react-redux";
import { addNews, getNewsById, updateNews } from "../../../actions/newsAction";
import SaveButton from "../buttons/SaveButton";
import ViewButton from "../buttons/ViewButton";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCategories } from "../../../actions/categoryActions";
import { TiTimes } from "react-icons/ti";

const NewsModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [form, setForm] = useState({});
  const [tag, setTag] = useState("");
  const [updateData, setUpdateData] = useState(false);

  const storedState = useSelector((state) => state);

  useEffect(() => {
    if (!storedState.categories) dispatch(fetchCategories());

    const fetchNewsData = async () => {
      const news = await dispatch(getNewsById(params.id));

      setForm(news);
    };

    if (params.id) {
      fetchNewsData();
      setUpdateData(true);
    }
  }, []);

  const { title, author, desc, desc2, image, country, city, state } = form;

  const [tags, setTags] = useState([]);

  const handleTags = (e) => {
    setTags([...tags, tag]);
    console.log(tags);
    setTag("");
  };

  const handleChange = (e) => {
    if (e.target.name === "tag") {
      setTag(e.target.value);
    } else setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    form.tags = tags;
    if (form.category === null) {
      form.category = storedState.categories[0]._id;
    }
    if (updateData === false) dispatch(addNews(form));
    else {
      dispatch(updateNews(form, params.id));
    }
    navigate("/news");
  };

  const closeModal = () => {
    // dispatch({ type: CLOSE_MODAL, payload: null });
    navigate("/news");
  };

  return (
    <div className="modal-container">
      <div className="modal-wrapper">
        <ViewButton handleClick={closeModal} text="Go Back" />
        <h3 className="modal-title">
          {updateData === false ? "Add" : "Update"} News
        </h3>
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
        <select name="category" className="select-box" onChange={handleChange}>
          {storedState.categories?.map((item) => {
            return (
              <option
                value={item._id}
                selected={form.category?._id === item._id}
              >
                {item.value}
              </option>
            );
          })}
        </select>
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
        <div className="tag-div">
          <input
            name="tag"
            type="text"
            placeholder="Add Tags"
            className="modal-input"
            value={tag}
            onChange={handleChange}
          />
          <SaveButton text="Add" handleClick={handleTags} />
        </div>
        <div className="tag-list">
          {tags.map((tag) => {
            return (
              <div className="tags">
                <div>{tag}</div>
              </div>
            );
          })}
        </div>

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
        <SaveButton handleClick={handleSubmit} />
      </div>
    </div>
  );
};

export default NewsModal;
