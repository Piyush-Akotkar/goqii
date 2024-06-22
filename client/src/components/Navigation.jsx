import React from "react";
import { BsFillPersonPlusFill, BsFillHouseFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
      <Link to="/">
        <BsFillHouseFill className="icon-item" />
      </Link>
      <Link to="/addUser">
        <BsFillPersonPlusFill className="icon-item" />
      </Link>
    </div>
  );
};

export default Navigation;
