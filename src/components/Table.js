import React from "react";

const Table = ({ data }) => {
  return (
    <div>
      <h1>Grade Aggregates</h1>
      <div style={{ display: "flex" }}>
        {data.map((d) => {
          return (
            <div key={d.grade} style={{ margin: 5 }}>
              <p>{d.grade}</p>
              <p>
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(d.currentBalance)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Table;
