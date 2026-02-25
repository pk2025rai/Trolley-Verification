import React from "react";
import "../styles/usermanagement.css";

const Users = () => {
  return (
    <div className="users-page">
      {/* Top controls */}
      <div className="users-controls">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search" />
        </div>

        <select>
          <option>Role</option>
          <option>Admin</option>
          <option>Operator</option>
        </select>

        <select>
          <option>Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <button className="add-user-btn">+ Add User</button>
      </div>

      {/* Table */}
      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>User Id</th>
              <th>User Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {[
              ["U12347", "Ravi Kumar", "Operator", "Active"],
              ["U12349", "Sita Patel", "Operator", "Inactive"],
              ["U12367", "Amit Sharma", "Operator", "Inactive"],
              ["U12388", "Neha Gupta", "Admin", "Inactive"],
              ["U12347", "Vikram Singh", "Admin", "Inactive"],
              ["U12357", "Ravi Rathod", "Operator", "Inactive"],
              ["U12337", "Rutuj Kamable", "Operator", "Active"],
            ].map((u, i) => (
              <tr key={i}>
                <td>{u[0]}</td>
                <td>{u[1]}</td>
                <td>{u[2]}</td>
                <td>
                  <span className={`status ${u[3].toLowerCase()}`}>
                    {u[3]}
                    <span className="dot" />
                  </span>
                </td>
                <td className="action-icons">
                  ✏️ 🗑️
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <span>‹</span>
        <span>‹</span>
        <span className="active">1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>›</span>
        <span>›</span>
      </div>

      {/* Help Button */}
      <div className="help-btn">?</div>
    </div>
  );
};

export default Users;