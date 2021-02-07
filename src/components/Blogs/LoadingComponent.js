import React from "react";

const LoadingComponent = () => {
  return (
    <div
      style={{ height: "100vh", alignItems: "center" }}
      className="d-flex justify-content-center"
    >
      <div
        style={{ width: "3rem", height: "3rem" }}
        className="spinner-border"
        role="status"
      >
        <span className="visually-hidden"></span>
      </div>
    </div>
  );
};

export default LoadingComponent;