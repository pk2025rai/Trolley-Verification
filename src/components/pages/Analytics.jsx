import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import "../styles/Charts.css";

/* ------------------ DATA ------------------ */
const bucketData = [
  { bucket: "BUC123", compliant: 20, nonCompliant: 10 },
  { bucket: "BUC124", compliant: 10, nonCompliant: 18 },
  { bucket: "BUC125", compliant: 12, nonCompliant: 13 },
  { bucket: "BUC126", compliant: 23, nonCompliant: 5 },
];

const operatorData = [
  { name: "Operator 1", value: 70 },
  { name: "Operator 2", value: 30 },
];

const trendData = [
  { date: "29/7", value: 10 },
  { date: "30/7", value: 5 },
  { date: "31/7", value: 15 },
  { date: "1/8", value: 8 },
  { date: "5/8", value: 30 },
];

const ladbfData = [
  { time: "2H", v1: 120000, v2: 180000 },
  { time: "6H", v1: 160000, v2: 100000 },
  { time: "20H", v1: 90000, v2: 50000 },
  { time: "7H", v1: 140000, v2: 200000 },
  { time: "4H", v1: 80000, v2: 120000 },
];

const PIE_COLORS = ["#f59e0b", "#1d4ed8"];

/* ------------------ COMPONENT ------------------ */
const Analytics = () => {
  return (
    <div className="analytics-page">
      {/* ================= FILTERS ================= */}
      <div className="filters">
        <select>
          <option>Start Date</option>
        </select>
        <select>
          <option>End Date</option>
        </select>
        <select>
          <option>Bucket Number</option>
        </select>
        <select>
          <option>Operator</option>
        </select>
        <select>
          <option>Shift</option>
        </select>
        <button className="btn compliant">Compliant</button>
        <button className="btn non-compliant">Non-compliant</button>
      </div>

      {/* ================= STATS ================= */}
      <div className="stats-grid">
        <div className="stat-card">
          <h2>2,355</h2>
          <p>Total Buckets Analyzed</p>
        </div>
        <div className="stat-card">
          <h2>35%</h2>
          <p>Total Compliance Percentage</p>
        </div>
        <div className="stat-card">
          <h2>350</h2>
          <p>Total Non-Compliance Events</p>
        </div>
        <div className="stat-card">
          <h2>28 Hour</h2>
          <p>Average Machine Run Hours</p>
        </div>
        <div className="stat-card">
          <h2>20</h2>
          <p>Operator Most Non-Compliance</p>
        </div>
      </div>

      {/* ================= CHARTS ================= */}
      <div className="charts-grid">
        {/* Bucket Bar Chart */}
        <div className="chart-card">
          <h4>Bucket Number</h4>
          <ResponsiveContainer width="60%" height="100%">
            <BarChart data={bucketData}>
              <XAxis dataKey="bucket" />
              <YAxis />
              <Tooltip />
              <Legend />

              {/* STACKED BAR */}
              <Bar dataKey="compliant" stackId="a" fill="#8b5cf6" />
              <Bar dataKey="nonCompliant" stackId="a" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Operator Donut */}
        <div className="chart-card-pie">
          <h4>Operator Wise</h4>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={operatorData}
                innerRadius={65}
                outerRadius={95}
                paddingAngle={5}
                dataKey="value"
              >
                {operatorData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Trend */}
        <div className="chart-card">
          <h4>Non-Compliance Trend</h4>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="bottom-grid">
        {/* Heatmap */}
        <div className="chart-card">
          <h4>Monthly Hours</h4>
          <div className="heatmap">
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className={`heat-cell level-${i % 4}`} />
            ))}
          </div>
        </div>

        {/* Multi Line */}
        <div className="chart-card">
          <h4>LADBF Value</h4>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ladbfData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line dataKey="v1" stroke="#7c3aed" strokeWidth={2} />
              <Line dataKey="v2" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
