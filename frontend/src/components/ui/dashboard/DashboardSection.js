import React from "react";

const DashboardSection = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-section">
        <div className="dashboard-section-item">
          <h3>Active Users</h3>
          <p>3456</p>
        </div>
        <div className="dashboard-section-item">
          <h3>Total Earnings</h3>
          <p>$3456</p>
        </div>
        <div className="dashboard-section-item">
          <h3>Net Profit</h3>
          <p>$500</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
