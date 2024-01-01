import React, { useState } from "react";
import "../App.css";
import ProfileHeader from "../components/profileComponents/ProfileHeader";
import CurrentProfile from "../components/profileComponents/CurrentProfile";

function ProfilePage() {
  return (
    <>
      <ProfileHeader />
      <div className="current-profile-container">
        <CurrentProfile />
      </div>
    </>
  );
}

export default ProfilePage;
