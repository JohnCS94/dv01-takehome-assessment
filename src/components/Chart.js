import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Chart = ({ data }) => {
  const CustomTooltop = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="tooltip">
          <p className="table-head">Grade {label}</p>
          <p>
            {Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(payload[0].value)}
          </p>
        </div>
      );
    }

    return null;
  };
  return (
    <div className="chart">
      <h1>Aggregates Chart</h1>
      <ResponsiveContainer width="90%">
        <BarChart
          width={600}
          height={500}
          data={data}
          {...{ overflow: "visible" }}
        >
          <XAxis
            dataKey="grade"
            stroke="#855ffc"
            label={{ value: "Grade", position: "insideBottom", offset: -5 }}
          />
          <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
          <Tooltip content={<CustomTooltop />} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar
            dataKey="currentBalance"
            fill="#855ffc"
            barSize={60}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
