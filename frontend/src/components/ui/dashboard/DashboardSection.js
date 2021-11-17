import React from "react";
import { FaUser, FaMoneyBillWaveAlt, FaRegNewspaper } from "react-icons/fa";

const DashboardSection = () => {
  const latestNews = [
    {
      id: 1,
      title: "News Title 1",
      category: "Sports",
      date: "20th November, 2021",
    },
    {
      id: 2,
      title: "News Title 2",
      category: "Sports",
      date: "20th November, 2021",
    },
    {
      id: 3,
      title: "News Title 3",
      category: "Sports",
      date: "20th November, 2021",
    },
    {
      id: 4,
      title: "News Title 4",
      category: "Sports",
      date: "20th November, 2021",
    },
    {
      id: 5,
      title: "News Title 5",
      category: "Sports",
      date: "20th November, 2021",
    },
  ];
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
            {latestNews.map((item) => {
              return (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.category}</td>
                  <td>{item.date}</td>
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
