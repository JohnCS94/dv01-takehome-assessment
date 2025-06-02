import React from "react";
import { BarChart, Bar, XAxis, CartesianGrid } from "recharts";

const Chart = ({ data }) => {
  return (
    <div>
      <BarChart width={600} height={500} data={data}>
        <XAxis dataKey="grade" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="currentBalance" fill="#000000" barSize={60} />
      </BarChart>
    </div>
  );
};

export default Chart;
