import React from "react";
import { BsBan, BsCheck2Circle } from "react-icons/bs";

const AlertBox = ({status, message}) => {
  const AlertContent = () => {
    return (
      <div className={`alert-box-content ${status}`}>
        {status === "success" ? (
          <>
            <BsCheck2Circle />
            <span> {message} </span>
          </>
        ) : (
          <>
            <BsBan />
            <span> {message} </span>
          </>
        )}
      </div>
    );
  };
  return (
    <div className={`alert-box`}>
      <AlertContent />
    </div>
  );
};

export default AlertBox;