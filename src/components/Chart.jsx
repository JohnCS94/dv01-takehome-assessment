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

import LoadingBars from "./LoadingBars";

const Chart = ({ data, isLoading, error }) => {
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

  if (isLoading) return <LoadingBars />;

  if (error)
    return (
      <div className="chart">
        <h2>Error Retrieving Data</h2>
      </div>
    );

  if (!data.length)
    return (
      <div className="chart">
        <h2>No Data to Display</h2>
        <h3>Try updating filters to see data</h3>
      </div>
    );

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
