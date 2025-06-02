import React from "react";
import LoadingBars from "./LoadingBars";

const Table = ({ data, isLoading, error }) => {
  if (isLoading) return <LoadingBars />;

  if (error)
    return (
      <div className="table">
        <h2>Error Retrieving Data</h2>
      </div>
    );

  if (!data.length)
    return (
      <div className="table">
        <h2>No Data to Display</h2>
      </div>
    );

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
