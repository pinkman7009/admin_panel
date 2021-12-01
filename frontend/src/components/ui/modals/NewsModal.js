import React, { useState, useEffect, useCallback } from "react";
import "quill/dist/quill.snow.css";
import "../../../styles/News.css";
import "../../../styles/Modal.css";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_MODAL } from "../../../types/modalTypes";
import { addNews, getNewsById, updateNews } from "../../../actions/newsAction";
import Quill from "quill";
import SaveButton from "../buttons/SaveButton";
import ViewButton from "../buttons/ViewButton";
import TextEditor from "../news/TextEditor";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCategories } from "../../../actions/categoryActions";

const NewsModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [quill, setQuill] = useState("");
  const [quill2, setQuill2] = useState("");

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper === null) {
      return;
    }
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);

    const toolbarOptions = [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ];

    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: toolbarOptions,
      },
      placeholder: "Enter description",
    });

    setQuill(q);

    // if (desc) quill.root.innerHTML = desc;
  }, []);

  const wrapperRef2 = useCallback((wrapper) => {
    if (wrapper === null) {
      return;
    }
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);

    const toolbarOptions = [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ];

    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: toolbarOptions,
      },
      placeholder: "Enter description",
    });

    setQuill2(q);

    // if (desc2) quill2.root.innerHTML = desc2;
  }, []);

  const [form, setForm] = useState({});
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

  const { title, author, image, country, city, state, category, desc, desc2 } =
    form;

  useEffect(() => {
    if (desc) quill.root.innerHTML = desc;
    if (desc2) quill2.root.innerHTML = desc2;
  }, [desc, desc2]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    form.desc = quill.root.innerHTML;
    form.desc2 = quill2.root.innerHTML;

    console.log({ form });
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
    navigate("/news");
  };

  return (
    <div className="modal-container">
      <div className="modal-wrapper">
        <ViewButton
          handleClick={closeModal}
          text="Go Back"
          className="go-back-btn"
        />
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

        <div className="text-editor-container">
          <div ref={wrapperRef} className="text-editor-wrapper"></div>
        </div>

        <div className="text-editor-container">
          <div ref={wrapperRef2} className="text-editor-wrapper"></div>
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
