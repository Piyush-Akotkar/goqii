import React, { useEffect, useState } from "react";
import { BsBan, BsCheck2Circle } from "react-icons/bs";

const AlertBox = ({ status, message, onHide }) => {
  const [hide, setHide] = useState(false);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true);
    }, 3000);

    return () => {
      setHide(false);
      clearTimeout(timer);
    };
  }, [onHide]);

  return (
    !hide && (
      <div className={`alert-box`}>
        <AlertContent />
      </div>
    )
  );
};

export default AlertBox;
