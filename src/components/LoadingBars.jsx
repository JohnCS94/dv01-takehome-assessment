import React from "react";
import ReactLoading from "react-loading";

const LoadingBars = () => {
  return (
    <div className="loading-container">
      <ReactLoading type="bars" color="#855ffc" height={40} width={120} />
    </div>
  );
};

export default LoadingBars;
