import React from "react";

const Table = ({ data }) => {
  return (
    <div className="table">
      <h1>Grade Aggregates</h1>
      <div className="cells">
        {data.map((d) => {
          return (
            <div key={d.grade} className="cell">
              <p className="table-head">Grade {d.grade}</p>
              <p className="table-body">
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
