import React, { useState, useEffect } from "react";
// import statusImg from "../../assets/status-img.jpg";
import "../../App.css";
import axios from "../../axios";

import {
  verifyEmail,
  verifyPhone,
  verifyZip,
} from "../form-components/verification";
// import { display } from "@mui/system";

function CurrentProfile() {
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newZipcode, setNewZipcode] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setConfirmNewPassword] = useState("");

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phone, setPhone] = useState("");
  const [newProfileImg, setNewProfileImg] = useState(null);
  const [currentProfileImg, setCurrentProfileImg] = useState("");
  // const [loggedProfileInfo, setLoggedProfileInfo] = useState([]);
  const [loggedProfileInfo, setLoggedProfileInfo] = useState([]);
  const [username, setUsername] = useState("");

  function handleImageChange(e) {
    if (e.target.files.length > 0) {
      setNewProfileImg(e.target.files[0]);
    } else setNewProfileImg(null);
  }

  const changeProfilePicture = async () => {
    let payload = new FormData();
    payload.append("image", newProfileImg);

    await axios.put("/avatar", payload);
  };

  //Gets the information for the logged in user
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user's headline and update status state
        const response = await axios.get(`/profile`);
        setLoggedProfileInfo(response.data);
        // setting the things the things
        setDisplayName(response.data.displayname);
        setEmail(response.data.email);
        setZipcode(response.data.zipcode);
        setPhone(response.data.phone);
        setCurrentProfileImg(response.data.avatar);
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUserData();
  }, [newProfileImg]);

  //   const [updatePage, setUpdatePage] = useState(false);

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handleZipcodeChange = (event) => {
    setNewZipcode(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  //Clear helper function
  const clearAll = () => {
    setNewUsername("");
    setNewEmail("");
    setNewZipcode("");
    setNewPhone("");
    setNewPassword("");
    setConfirmNewPassword("");
    setNewProfileImg(null);
  };

  //Updating functions

  const handleUpdateProfile = async () => {
    let valid = true;

    //email
    if (newEmail !== "") {
      //In case  the email is not valid
      if (
        verifyEmail(newEmail) === "You have entered an invalid email address"
      ) {
        valid = false;
        window.alert("Please enter a valid email address");
      }
    }

    //zipcode
    if (newZipcode !== "") {
      //In case  the zipcode is not valid
      if (verifyZip(newZipcode) === "please match format of 11111") {
        window.alert("Please enter a valid zipcode in the format 11111");
        valid = false;
      }
    }

    //Phone
    if (newPhone !== "") {
      //In case  the phone is not valid
      if (verifyPhone(newPhone) === "please match format of 111-111-1111") {
        window.alert("Please enter a phone number in the format 111-111-1111");
        valid = false;
      }
    }

    if (newPassword !== "" || newConfirmPassword !== "") {
      if (newPassword !== newConfirmPassword) {
        window.alert("Passwords do not match");
        valid = false;
      }
    }

    if (valid) {
      if (newUsername !== "") {
        const response = await axios.put("/displayname", {
          displayname: newUsername,
        });
        setDisplayName(response.data.displayname);
      }

      if (newEmail !== "") {
        const response = await axios.put("/email", {
          email: newEmail,
        });
        setEmail(response.data.email);
      }

      if (newZipcode !== "") {
        const response = await axios.put("/zipcode", {
          zipcode: newZipcode,
        });
        setZipcode(response.data.zipcode);
      }

      if (newPhone !== "") {
        const response = await axios.put("/phone", {
          phone: newPhone,
        });
        setPhone(response.data.phone);
      }

      if (newPassword !== "") {
        // I might have to do /password?
        const response = await axios.put("password", {
          password: newPassword,
        });
      }
      if (newProfileImg) {
        await changeProfilePicture();
        const response = await axios.get(`/avatar/${username}`);
        setCurrentProfileImg(response.avatar);
      }

      clearAll();
    }
  };

  return (
    <div className="current-profile">
      <div className="centered-profile-parts">
        <h1 className="current-profile-header">Current Profile</h1>
        <div className="profile-img-container">
          <input
            className="newProfileImg"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
            name=""
            id=""
          />
          <img className="profile-page-img" src={currentProfileImg} alt="" />
        </div>
      </div>

      <div className="user-item">
        <h1>Display Name: {displayName}</h1>
        <input
          type="text"
          id="displayName"
          name="displayName"
          placeholder="Enter Display Name"
          value={newUsername}
          onChange={handleUsernameChange}
        />
      </div>
      <div className="user-item">
        <h1>Email: {email}</h1>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="name@email.etc"
          value={newEmail}
          onChange={handleEmailChange}
        />
      </div>
      <div className="user-item">
        <h1>Zipcode: {zipcode}</h1>
        <input
          type="tel"
          name="zipcode"
          id="zipcode"
          placeholder="ex. 12345"
          pattern="[0-9]{5}"
          value={newZipcode}
          onChange={handleZipcodeChange}
        />
      </div>
      <div className="user-item">
        <h1>Phone: {phone}</h1>
        <input
          type="text"
          id="phone"
          name="phone"
          placeholder="Enter New Phone Number"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          value={newPhone}
          onChange={handlePhoneChange}
        />
      </div>
      <div className="user-item">
        <h1>New Password</h1>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter New Passowrd"
          value={newPassword}
          onChange={handlePasswordChange}
        />
      </div>
      <div className="user-item">
        <h1>Confirm Password</h1>
        <input
          type="password"
          id="confirm_password"
          name="confirm_password"
          placeholder="Confirm Passowrd"
          value={newConfirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </div>
      <div className="profile-btn" onClick={handleUpdateProfile}>
        <button>Update Profile</button>
      </div>
    </div>
  );
}

export default CurrentProfile;
