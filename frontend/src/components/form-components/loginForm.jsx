import React, { useState } from "react";
import axios from "../../axios"; // Import your configured Axios instance
import "./styles.css";

import userData from "../../json-users/users";
import { useNavigate } from "react-router-dom";

function LoginForm(props) {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showGoogleDialog, setShowGoogleDialog] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const name = document.getElementById("name");

    const response = await axios.post("/login", {
      username: loginUsername,
      password: loginPassword,
    });

    const matchingUser = userData.find((user) => {
      return user.username === loginUsername;
    });

    if (response.data.result === "success") {
      name.setCustomValidity("");
      navigate("/MainPage");
    } else {
      window.alert("incorrect username or password");
    }
  };

  const handleGoogleLogin = () => {};

  const openGoogleDialog = () => {
    setShowGoogleDialog(true);
  };

  const closeGoogleDialog = () => {
    setShowGoogleDialog(false);
  };

  return (
    <div className="form-container">
      <form className="form" id="reg-form">
        <h1 className="form-type-header">Login</h1>
        <p onClick={props.toggleForm} className="toggleForm">
          Need to sign up?
        </p>
        <div className="loginContainer">
          <div className="form-items">
            <div className="form-item">
              <label htmlFor="name">Account Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Name"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-item">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
            <div className="login-btn-container">
              <button
                type="submit"
                className="button"
                id="login-btn"
                onClick={handleLogin}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
