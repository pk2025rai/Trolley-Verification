import React from "react";
import "../styles/config.css";

const Configuration = () => {
  return (
    <div className="config-page">
      <div className="config-grid">
        {/* Upper Threshold */}
        <div className="config-card">
          <h3>Upper Threshold</h3>

          <input type="text" placeholder="Min Range" />
          <input type="text" placeholder="Max Range" />

          <button className="primary-btn">Update</button>
        </div>

        {/* Lower Threshold */}
        <div className="config-card">
          <h3>Lower Threshold</h3>

          <input type="email" placeholder="Email Id" />

          <select>
            <option>Select User</option>
            <option>User 1</option>
            <option>User 2</option>
          </select>

          <input type="text" placeholder="SMS Notification" />

          <button className="primary-btn">SMS Notification</button>
        </div>

        {/* Notification & Alert Configuration */}
        <div className="config-card">
          <h3>Notification & Alert Configuration</h3>

          <input type="text" placeholder="User ID" />

          <select>
            <option>Priority</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button className="primary-btn">Update</button>
        </div>
      </div>

      {/* Help Button */}
      <div className="help-btn">?</div>
    </div>
  );
};

export default Configuration;