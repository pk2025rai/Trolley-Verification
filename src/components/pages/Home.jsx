import React from "react";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="dashboard-grid">
        <div className="card lidar-card">
          <h4>LIDAR Status</h4>

          <div className="lidar-chart">
            <div className="bar-container">
              <div className="bar online-bar" style={{ height: "80px" }}>
                <span className="value">20</span>
              </div>
              <p>Online</p>
            </div>

            <div className="bar-container">
              <div className="bar offline-bar" style={{ height: "45px" }}>
                <span className="value">9</span>
              </div>
              <p>Offline</p>
            </div>
          </div>
        </div>

        {/* BUCKET */}
        <div className="card bucket-card">
          <div className="bucket-row">
            <span className="bucket-label">Bucket 1</span>
            <div className="bucket-bar green">
              <span>75% Full</span>
            </div>
          </div>

          <div className="bucket-row">
            <span className="bucket-label">Bucket 2</span>
            <div className="bucket-bar yellow">
              <span>Near Limit</span>
            </div>
          </div>

          <div className="bucket-row">
            <span className="bucket-label">Bucket 3</span>
            <div className="bucket-bar red">
              <span>Non-Compliant</span>
            </div>
          </div>

          <h4 className="bucket-title">Real Time Bucket Levels</h4>
        </div>

        <div className="card donut-card">
          <div className="legend top-legend">
            <span>
              <i className="blue" /> Completed Cycle
            </span>
            <span>
              <i className="orange" /> Non-compliance
            </span>
          </div>

          <div className="donut-wrapper">
            <div className="donut-chart"></div>
          </div>

          <h4 className="donut-title">Daily Performance Overview</h4>
        </div>
        <div className="card stat-card small-stat cycle-stat">
          <div className="stat-top">
            <div className="stat-icon pie-icon"></div>
            <h2>42</h2>
          </div>
          <p>Cycle Completed</p>
        </div>

        <div className="card stat-card small-stat issue-stat">
          <div className="stat-top">
            <div className="stat-icon issue-icon"></div>
            <h2>5</h2>
          </div>
          <p>Issue Observed</p>
        </div>
      </div>

      <div className="card table-card">
        <h3 className="table-title">Trolley List Analytics</h3>

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

        {/* Pagination */}
        <div className="pagination">
          <span>{"<"}</span>
          <span>{"<"}</span>

          <span className="active">1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>

          <span>{">"}</span>
          <span>{">"}</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
