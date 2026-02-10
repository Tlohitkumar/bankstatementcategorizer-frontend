import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function CategoryChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://bank-statement-categorizer-yk16.onrender.com/transactions/summary/category")
      .then((res) => res.json())
      .then((result) =>
        setData(
          result.map((item) => ({
            name: item.category,
            value: item.totalAmount
          }))
        )
      );
  }, []);

  return (
    <div>
      <h3>Category-wise Spending</h3>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx={200}
          cy={150}
          outerRadius={100}
          dataKey="value"
          nameKey="name"
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default CategoryChart;


