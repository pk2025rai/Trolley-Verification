import React from "react";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home">

      {/* ===== TOP ROW ===== */}
      <div className="top-row">

        {/* LIDAR */}
        <div className="card lidar-card">
          <h4>LIDAR Status</h4>
          <div className="lidar-bars">
            <div className="lidar online">Online</div>
            <div className="lidar offline">Offline</div>
          </div>
        </div>

        {/* BUCKET */}
        <div className="card bucket-card">
          <h4>Real Time Bucket Levels</h4>
          <div className="bucket green">Bucket 1 &nbsp; 75% Full</div>
          <div className="bucket yellow">Bucket 2 &nbsp; Near Limit</div>
          <div className="bucket red">Bucket 3 &nbsp; Non-Compliant</div>
        </div>

        {/* DONUT */}
        <div className="card donut-card">
          <h4>Daily Performance Overview</h4>
          <div className="donut-chart" />
          <div className="legend">
            <span><i className="blue" /> Completed Cycle</span>
            <span><i className="orange" /> Non-compliance</span>
          </div>
        </div>

      </div>

      {/* ===== STATS ===== */}
      <div className="stats-row">
        <div className="card stat-card">
          <h2>42</h2>
          <p>Cycle Completed</p>
        </div>

        <div className="card stat-card">
          <h2>5</h2>
          <p>Issue Observed</p>
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="card table-card">
        <h3>Trolley List Analytics</h3>

        <table>
          <thead>
            <tr>
              <th>Bucket ID</th>
              <th>Level</th>
              <th>Status</th>
              <th>Last Update</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>BUC12347</td>
              <td>80%</td>
              <td className="normal">Normal</td>
              <td>10:30 AM</td>
            </tr>
            <tr>
              <td>BUC12349</td>
              <td>45%</td>
              <td className="warning">Warning</td>
              <td>11:34 AM</td>
            </tr>
            <tr>
              <td>BUC12367</td>
              <td>15%</td>
              <td className="critical">Critical</td>
              <td>12:23 PM</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Home;
