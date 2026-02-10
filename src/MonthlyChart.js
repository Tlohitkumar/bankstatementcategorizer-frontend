import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

function MonthlyChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://bank-statement-categorizer-yk16.onrender.com/transactions/summary/monthly")
      .then((res) => res.json())
      .then((result) =>
        setData(
          result.map((item) => ({
            month: item.month + "/" + item.year,
            total: item.totalAmount
          }))
        )
      );
  }, []);

  return (
    <div>
      <h3>Monthly Spending</h3>
      <BarChart width={500} height={300} data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" />
      </BarChart>
    </div>
  );
}

export default MonthlyChart;
