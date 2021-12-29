import React, { useState, useEffect } from "react";
import "../../../styles/Modal.css";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_MODAL } from "../../../types/modalTypes";
import ViewButton from "../buttons/ViewButton";
import { register, addRole, updateRole } from "../../../actions/registerAction";
import SaveButton from "../buttons/SaveButton";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { getUserById } from "../../../actions/roleAction";
import { fetchCategories } from "../../../actions/categoryActions";
import { LOGIN_FAIL } from "../../../types/AuthTypes";

const AccessModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [form, setForm] = useState({});

  const [roleType, setRoleType] = useState("0");
  const [updateData, setUpdateData] = useState(false);

  const [permissions, setPermissions] = useState([]);
  const [categories_permissions, setCategories_permissions] = useState([]);
  const state = useSelector((state) => state);

  useEffect(() => {
    if (!state.categories) dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await dispatch(getUserById(params.id));
      setCategories_permissions(userData?.data.categories_permissions);

      let permissions = userData?.data.permissions;

      if (
        userData?.data.categories_permissions?.length !==
        state.categories.length
      ) {
        permissions = permissions.filter((item) => item !== "CATEGORIES");
      }
      setPermissions(permissions);
      setForm(userData?.data);
    };

    if (params.id) {
      fetchUser();
      setUpdateData(true);
    }
  }, []);

  const { firstname, lastname, email, password, roleTitle } = form;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.checked });
  };

  const handlePermissions = (e) => {
    if (permissions.includes(e.target.value)) {
      const updatedPermissions = permissions.filter(
        (item) => item !== e.target.value
      );
      setPermissions(updatedPermissions);
    } else setPermissions([...permissions, e.target.value]);
  };

  const handleCategoryPermissions = (e) => {
    if (!permissions.includes("CATEGORIES")) {
      if (
        categories_permissions.some((item) => item.category === e.target.value)
      ) {
        const updatedCategoriesPermissions = categories_permissions.filter(
          (item) => {
            return item.category !== e.target.value;
          }
        );
        setCategories_permissions(updatedCategoriesPermissions);
      } else
        setCategories_permissions([
          ...categories_permissions,
          { category: e.target.value },
        ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.role = 0;
    form.permissions = permissions;
    form.categories_permissions = categories_permissions;

    if (permissions.includes("CATEGORIES")) {
      const cpermissions = state.categories.map((item) => {
        return {
          category: item._id,
        };
      });
      form.categories_permissions = cpermissions;
    }

    if (categories_permissions.length > 0) form.permissions.push("CATEGORIES");
    // console.log({ form });
    if (updateData === false) {
      dispatch(addRole(form));
    } else {
      dispatch(updateRole(form, params.id));
    }
    dispatch({ type: CLOSE_MODAL });
    navigate("/access");
  };

  const [page, setPage] = useState(1);
  const closeModal = () => {
    if (page === 1) navigate("/access");
    else setPage(1);
  };

  const firstPage = () => {
    return (
      <>
        <input
          name="roleTitle"
          type="text"
          placeholder="Enter Role Title"
          className="modal-input"
          value={roleTitle}
          onChange={handleChange}
        />
        <div className="admin-access-options">
          <div className="checkbox-group">
            <label htmlFor="">View Access</label>
            <input
              type="checkbox"
              name="viewAccess"
              checked={form.viewAccess}
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="checkbox-group">
            <label htmlFor="">Edit Access</label>
            <input
              type="checkbox"
              name="editAccess"
              checked={form.editAccess}
              onChange={handleCheckboxChange}
            />
          </div>
        </div>
        <ViewButton handleClick={() => setPage(2)} text="Next" />
      </>
    );
  };

  const secondPage = () => {
    return (
      <>
        <input
          name="firstname"
          type="text"
          placeholder="Enter first name"
          className="modal-input"
          value={firstname}
          onChange={handleChange}
        />
        <input
          name="lastname"
          type="text"
          placeholder="Enter last name"
          className="modal-input"
          value={lastname}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Enter email"
          className="modal-input"
          value={email}
          onChange={handleChange}
        />
        {updateData === false && (
          <input
            name="password"
            type="password"
            placeholder="Enter password"
            className="modal-input"
            value={password}
            onChange={handleChange}
          />
        )}

        {roleType === "0" ? (
          <div className="admin-access-options">
            <div className="checkbox-group">
              <label htmlFor="">Manage Access</label>
              <input
                type="checkbox"
                value="MANAGE_ACCESS"
                onChange={handlePermissions}
                checked={permissions.includes("MANAGE_ACCESS")}
              />
            </div>
            <div className="checkbox-group">
              <label htmlFor="">Categories</label>
              <input
                type="checkbox"
                value="CATEGORIES"
                onChange={handlePermissions}
                checked={permissions.includes("CATEGORIES")}
              />
            </div>
            {state.categories?.map((category) => {
              return (
                <div className="checkbox-subgroup">
                  <label htmlFor="">{category.value}</label>
                  <input
                    checked={
                      permissions.includes("CATEGORIES")
                        ? true
                        : categories_permissions.some(
                            (item) => item.category === category._id
                          )
                        ? true
                        : false
                    }
                    type="checkbox"
                    value={category._id}
                    onChange={handleCategoryPermissions}
                  />
                </div>
              );
            })}
            <div className="checkbox-group">
              <label htmlFor="">News</label>
              <input
                type="checkbox"
                value="NEWS"
                onChange={handlePermissions}
                checked={permissions.includes("NEWS")}
              />
            </div>
            <div className="checkbox-group">
              <label htmlFor="">News Approval</label>
              <input
                type="checkbox"
                value="NEWS_APPROVAL"
                onChange={handlePermissions}
                checked={permissions.includes("NEWS_APPROVAL")}
              />
            </div>
            <div className="checkbox-group">
              <label htmlFor="">Ratings</label>
              <input
                type="checkbox"
                value="RATINGS"
                onChange={handlePermissions}
                checked={permissions.includes("RATINGS")}
              />
            </div>
            <div className="checkbox-group">
              <label htmlFor="">Channels</label>
              <input
                type="checkbox"
                value="CHANNELS"
                onChange={handlePermissions}
                checked={permissions.includes("CHANNELS")}
              />
            </div>
            <div className="checkbox-group">
              <label htmlFor="">Customer Details</label>
              <input
                type="checkbox"
                value="CUSTOMER_DETAILS"
                onChange={handlePermissions}
                checked={permissions.includes("CUSTOMER_DETAILS")}
              />
            </div>
            <div className="checkbox-group">
              <label htmlFor="">Memberships</label>
              <input
                type="checkbox"
                value="MEMBERSHIP_PLAN"
                onChange={handlePermissions}
                checked={permissions.includes("MEMBERSHIP_PLAN")}
              />
            </div>
            <div className="checkbox-group">
              <label htmlFor="">Settings</label>
              <input
                type="checkbox"
                value="SETTINGS"
                onChange={handlePermissions}
                checked={permissions.includes("SETTINGS")}
              />
            </div>
          </div>
        ) : null}
        <SaveButton handleClick={handleSubmit} />
      </>
    );
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
          {updateData === false ? "Add" : "Update"} Role
        </h3>
        {page === 1 ? firstPage() : secondPage()}
      </div>
    </div>
  );
};

export default AccessModal;
