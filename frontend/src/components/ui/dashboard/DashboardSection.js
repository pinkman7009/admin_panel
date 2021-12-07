import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { FaUser, FaMoneyBillWaveAlt, FaRegNewspaper } from "react-icons/fa";
import { MdFormatListBulleted } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { getNews } from "../../../actions/newsAction";
import { fetchCategories } from "../../../actions/categoryActions";
import "../../../styles/Dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
);

const DashboardSection = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [chartData, setChartData] = useState({
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "New Users", // Name the series
        tension: 0.4,
        data: [10, 20, 10, 10, 30, 40, 15, 5, 28, 32], // Specify the data values array
        borderColor: "#2196f3", // Add custom color border (Line)
        backgroundColor: "#2196f3", // Add custom color background (Points and Fill)
        borderWidth: 1, // Specify bar border width
        fill: true,
      },
    ],
  });

  const [pieData, setPieData] = useState({
    labels: [
      "Sports",
      "Technology",
      "Politics",
      "Music",
      "Covid19",
      "Business",
    ],
    datasets: [
      {
        label: "News by Category",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(236, 54, 110, 1)",
          "rgba(71, 139, 214, 1)",
          "rgba(245, 177, 97, 1)",
          "rgba(24, 138, 141, 1)",
          "rgba(8, 37, 140, 1)",
          "rgba(245, 218, 97, 1)",
        ],
        borderColor: [
          "rgba(236, 54, 110, 1)",
          "rgba(71, 139, 214, 1)",
          "rgba(245, 177, 97, 1)",
          "rgba(24, 138, 141, 1)",
          "rgba(8, 37, 140, 1)",
          "rgba(245, 218, 97, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });
  useEffect(() => {
    if (!state.news) dispatch(getNews());
    if (!state.categories) dispatch(fetchCategories());
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
            <p>{state.news?.length}</p>
          </div>
          <div className="dashboard-item-icon">
            <FaRegNewspaper />
          </div>
        </div>
        <div className="dashboard-section-item">
          <div>
            <h3>Total Categories</h3>
            <p>{state.categories?.length}</p>
          </div>
          <div className="dashboard-item-icon">
            <MdFormatListBulleted />
          </div>
        </div>
      </div>

      <div className="charts-container">
        <div className="area-chart">
          <h3>New visitors</h3>
          <Line
            data={chartData}
            options={{
              responsive: true, // Instruct chart js to respond nicely.
            }}
          />
        </div>

        <div className="pie-chart">
          <h3>News by Category</h3>
          <Doughnut data={pieData} />;
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
