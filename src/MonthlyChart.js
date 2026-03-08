import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Cell
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
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
        <div style={{ color: "#d4af37", fontWeight: 600, marginBottom: 4 }}>{label}</div>
        <div style={{ color: "#8899b4" }}>
          ₹ {Number(payload[0].value).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
        </div>
      </div>
    );
  }
  return null;
};

function MonthlyChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://bank-statement-categorizer-yk16.onrender.com/transactions/summary/monthly")
      .then((res) => res.json())
      .then((result) => {
        setData(result.map((item) => ({
          month: item.month + "/" + item.year,
          total: item.totalAmount,
        })));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const maxVal = Math.max(...data.map((d) => d.total), 0);

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon green">📅</div>
        <div>
          <div className="card-title">Monthly Spending</div>
          <div className="card-desc">Trend over time</div>
        </div>
      </div>

      {loading ? (
        <div className="loading-dots"><span /><span /><span /></div>
      ) : data.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📊</span>
          No monthly data available.
        </div>
      ) : (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data} barCategoryGap="30%">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.04)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "#4a5a72", fontSize: 11, fontFamily: "'DM Mono', monospace" }}
                axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#4a5a72", fontSize: 10, fontFamily: "'DM Mono', monospace" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      entry.total === maxVal
                        ? "#d4af37"
                        : `rgba(79, 142, 247, ${0.4 + (entry.total / maxVal) * 0.5})`
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default MonthlyChart;