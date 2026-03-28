import React, { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#d4af37", "#4f8ef7", "#22d3a5", "#f0526a", "#a78bfa", "#f0d060"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#161f30",
        border: "1px solid rgba(212,175,55,0.2)",
        borderRadius: 8,
        padding: "10px 14px",
        fontFamily: "'DM Mono', monospace",
        fontSize: 12,
        color: "#f0f4ff",
      }}>
        <div style={{ color: payload[0].fill, fontWeight: 600, marginBottom: 4 }}>
          {payload[0].name}
        </div>
        <div style={{ color: "#8899b4" }}>
          ₹ {Number(payload[0].value).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
        </div>
      </div>
    );
  }
  return null;
};

const renderLegend = (props) => {
  const { payload } = props;
  return (
    <ul style={{ listStyle: "none", padding: 0, marginTop: 8 }}>
      {payload.map((entry, index) => (
        <li key={index} style={{
          display: "flex", alignItems: "center", gap: 8,
          marginBottom: 6, fontSize: 12,
          fontFamily: "'DM Mono', monospace", color: "#8899b4"
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: "50%",
            background: entry.color, flexShrink: 0,
            boxShadow: `0 0 6px ${entry.color}`
          }} />
          {entry.value}
        </li>
      ))}
    </ul>
  );
};

function CategoryChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://bank-statement-categorizer-yk16.onrender.com/transactions/summary/category")
      .then((res) => res.json())
      .then((result) => {
        setData(result.map((item) => ({
          name: item.category,
          value: item.totalAmount,
        })));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon gold">🥧</div>
        <div>
          <div className="card-title">Category Breakdown</div>
          <div className="card-desc">Spending by category</div>
        </div>
      </div>

      {loading ? (
        <div className="loading-dots"><span /><span /><span /></div>
      ) : data.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📉</span>
          No category data available.
        </div>
      ) : (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                nameKey="name"
              >
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                    stroke="rgba(0,0,0,0.3)"
                    strokeWidth={1}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={renderLegend} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default CategoryChart;