import React from "react";
import { useState } from "react";
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
  Label,
  CartesianGrid,
} from "recharts";
import {
  FiBarChart2,
  FiPieChart,
  FiAlertCircle,
  FiClock,
  FiUser,
} from "react-icons/fi";
import "../styles/Charts.css";

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
  { date: "29/7", value: 20 },
  { date: "30/7", value: 10 },
  { date: "31/7", value: 30 },
  { date: "1/8", value: 0 },
  { date: "5/8", value: 50 },
];

const ladbfData = [
  { time: "2H", v1: 120000, v2: 180000 },
  { time: "6H", v1: 160000, v2: 100000 },
  { time: "20H", v1: 90000, v2: 50000 },
  { time: "7H", v1: 140000, v2: 200000 },
  { time: "4H", v1: 80000, v2: 120000 },
];

const PIE_COLORS = ["#f59e0b", "#1d4ed8"];

const Analytics = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthLabel = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };
  return (
    <div className="analytics-page">
      {/* FILTERS */}
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
        <button>Compliant</button>
        <button>Non-compliant</button>
      </div>

      {/* STATS */}
      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <FiBarChart2 className="stat-icon" />
            <h2>2,355</h2>
          </div>
          <p>Total Buckets Analyzed</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <FiPieChart className="stat-icon" />
            <h2>35%</h2>
          </div>
          <p>Total Compliance Percentage</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <FiAlertCircle className="stat-icon" />
            <h2>350</h2>
          </div>
          <p>Total Non-Compliance Events</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <FiClock className="stat-icon" />
            <h2>28 Hour</h2>
          </div>
          <p>Average Machine Run Hours</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <FiUser className="stat-icon" />
            <h2>20</h2>
          </div>
          <p>Operator Most Non-Compliance</p>
        </div>
      </div>

      {/* TOP CHARTS */}
      <div className="charts-grid">
        <div className="chart-card bucket-chart">
          <h4>Bucket Number</h4>
          <ResponsiveContainer>
            <BarChart data={bucketData}>
              <XAxis dataKey="bucket" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="compliant" stackId="a" fill="#8b5cf6" />
              <Bar dataKey="nonCompliant" stackId="a" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card operator-chart">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Legend
                verticalAlign="top"
                align="center"
                iconType="circle"
                wrapperStyle={{
                  fontSize: "11px",
                  marginBottom: "6px",
                }}
              />

          
              <Pie
                data={operatorData}
                dataKey="value"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={2}
                cx="50%"
                cy="55%" 
              >
                {operatorData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          
          <div className="chart-footer-title">Operator Wise</div>
        </div>

        <div className="chart-card trend-chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={trendData}
              margin={{ top: 9, right: 10, left: 10, bottom: -10 }}
            >
              <XAxis dataKey="date" axisLine={false} tick={{ fontSize: 11 }} />

              <YAxis domain={[0, 70]} axisLine={false} tick={{ fontSize: 11 }}>
                <Label
                  value="Total No of Noncompliance Event"
                  angle={-90}
                  position="insideLeft"
                  style={{
                    textAnchor: "middle",
                    fill: "#4338ca",
                    fontSize: 10,
                  }}
                />
              </YAxis>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e5e7eb"
              />

              <Tooltip />

              <Line
                type="linear"
                dataKey="value"
                stroke="#000"
                strokeWidth={1.5}
                dot={{ r: 4, fill: "#2563eb", stroke: "#2563eb" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    
      <div className="bottom-grid">
        <div className="chart-card heatmap-chart">
        
          <div className="heatmap-header">
            <span className="nav-arrow" onClick={handlePrevMonth}>
              ‹
            </span>
            <span className="month-title">{monthLabel}</span>
            <span className="nav-arrow" onClick={handleNextMonth}>
              ›
            </span>
          </div>

        
          <div className="heatmap-days">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          {/* Body */}
          <div className="heatmap-body">
            <div className="heatmap-label">Total Hour</div>

            <div className="heatmap">
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className={`heat-cell level-${i % 4}`} />
              ))}
            </div>
          </div>
        </div>

        <div className="chart-card ladbf-chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={ladbfData}
              margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
            >
              <XAxis dataKey="time" tick={{ fontSize: 12 }} axisLine={false} />

              <YAxis tick={{ fontSize: 12 }} axisLine={false}>
              
                <Label
                  value="LADER Value"
                  angle={-90}
                  position="insideLeft"
                  style={{
                    textAnchor: "middle",
                    fill: "#4338ca",
                    fontSize: 12,
                  }}
                />
              </YAxis>

              <Tooltip />

           
              <Line
                type="monotone"
                dataKey="v1"
                stroke="#7c3aed"
                strokeWidth={2}
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="v2"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
