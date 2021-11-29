import React, { useEffect } from "react";
import { DateTime } from "luxon";
import { FaUser, FaMoneyBillWaveAlt, FaRegNewspaper } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getNews } from "../../../actions/newsAction";
import "../../../styles/Dashboard.css";

const DashboardSection = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    if (!state.news) dispatch(getNews());
  }, []);

  const latestNews = state.news?.slice(0, 5);

  return (
    <div className="dashboard-container">
      <div className="dashboard-section">
        <div className="dashboard-section-item">
          <div>
            <h3>Total Users</h3>
            <p>3456</p>
          </div>
          <div className="dashboard-item-icon">
            <FaUser />
          </div>
        </div>
        <div className="dashboard-section-item">
          <div>
            <h3>Total Earnings</h3>
            <p>$3456</p>
          </div>
          <div className="dashboard-item-icon">
            <FaMoneyBillWaveAlt />
          </div>
        </div>
        <div className="dashboard-section-item">
          <div>
            <h3>Total News Articles</h3>
            <p>500</p>
          </div>
          <div className="dashboard-item-icon">
            <FaRegNewspaper />
          </div>
        </div>
      </div>

      <div className="dashboard-section-2">
        <h3>Latest News Added</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>News Title</th>
              <th>Category</th>
              <th>Date Added</th>
            </tr>
          </thead>

          <tbody>
            {latestNews?.map((item, index) => {
              const dt = DateTime.fromISO(item.date);
              console.log({ date: item.date });
              console.log({ dt });
              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.category.value}</td>
                  <td>{dt.toLocaleString(DateTime.DATETIME_MED)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardSection;
