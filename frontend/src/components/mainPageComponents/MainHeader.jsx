import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios";

function MainHeader(props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/ProfilePage");
  };

  const handleLogout = async () => {
    const response = await axios.put("logout");
    if (response.status === 200) {
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <div className="main-header-container">
      <div className="main-header">
        <h1>PR</h1>
        <div className="mainBtns">
          <button className="profileBtn" onClick={handleClick}>
            Profile
          </button>
          <button className="profileBtn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainHeader;
