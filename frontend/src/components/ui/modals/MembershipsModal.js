import React, { useState, useEffect } from "react";
import "../../../styles/Modal.css";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "../../../types/modalTypes";
import {
  addMemberships,
  fetchMembershipById,
  updateMembership,
} from "../../../actions/membershipsAction";
import SaveButton from "../buttons/SaveButton";
import ViewButton from "../buttons/ViewButton";
import { useNavigate, useParams } from "react-router-dom";

const MembershipsModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [form, setForm] = useState({});
  const [updateData, setUpdateData] = useState(false);

  const {
    name,
    monthly_price,
    annually_price,
    createPostLimit,
    canComment,
    canDeletePost,
    viewPost,
  } = form;

  useEffect(() => {
    const fetchMembership = async () => {
      const membership = await dispatch(fetchMembershipById(params.id));

      setForm(membership);
    };

    if (params.id) {
      fetchMembership();
      setUpdateData(true);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (updateData === false) {
      dispatch(addMemberships(form));
    } else {
      dispatch(updateMembership(form, params.id));
    }
    dispatch({ type: CLOSE_MODAL });
    navigate("/memberships");
  };
  const closeModal = () => {
    // dispatch({ type: CLOSE_MODAL, payload: null });
    navigate("/memberships");
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
          {updateData === false ? "Add" : "Update"} Memberships
        </h3>
        <input
          name="name"
          type="text"
          placeholder="Plan name"
          className="modal-input"
          value={name}
          onChange={handleChange}
        />
        <input
          name="monthly_price"
          type="number"
          placeholder="Plan monthly price"
          className="modal-input"
          value={monthly_price}
          onChange={handleChange}
        />
        <input
          name="annually_price"
          type="number"
          placeholder="Plan annually price"
          className="modal-input"
          value={annually_price}
          onChange={handleChange}
        />
        <input
          name="createPostLimit"
          type="number"
          placeholder="Create Post Limit"
          className="modal-input"
          value={createPostLimit}
          onChange={handleChange}
        />
        <div className="admin-access-options">
          <div className="checkbox-group">
            <label htmlFor="">View Post</label>
            <input
              type="checkbox"
              name="viewPost"
              checked={viewPost}
              onChange={() => {
                setForm({
                  ...form,
                  viewPost: !viewPost,
                });
              }}
            />
          </div>
          <div className="checkbox-group">
            <label htmlFor="">Can Comment</label>
            <input
              type="checkbox"
              name="canComment"
              checked={canComment}
              onChange={() => {
                setForm({
                  ...form,
                  canComment: !canComment,
                });
              }}
            />
          </div>
          <div className="checkbox-group">
            <label htmlFor="">Can Delete Post</label>
            <input
              type="checkbox"
              name="canDeletePost"
              checked={canDeletePost}
              onChange={() => {
                setForm({
                  ...form,
                  canDeletePost: !canDeletePost,
                });
              }}
            />
          </div>
        </div>
        <SaveButton handleClick={handleSubmit} />
      </div>
    </div>
  );
};

export default MembershipsModal;
