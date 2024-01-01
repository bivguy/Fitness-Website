import React, { useState, useEffect } from "react";
import axios from "../../axios";

function Friend(props) {
  const { friend, handleRemoveFriend, friends } = props;
  const handleUnfollowClick = async (e) => {
    e.preventDefault();
    await handleRemoveFriend(friend);
  };

  const [friendAvatar, setFriendAvatar] = useState("");
  const [friendDisplayName, setFriendDisplayName] = useState("");
  const [friendHeadline, setFriendHeadline] = useState("");

  const fetchAvatar = async () => {
    const response = await axios.get(`/avatar/${friend}`);
    setFriendAvatar(response.data.avatar);
  };

  const fetchHeadline = async () => {
    const response = await axios.get(`/headline/${friend}`);
    setFriendHeadline(response.data.headline);
  };

  const fetchDisplayname = async () => {
    const response = await axios.get(`/displayname/${friend}`);
    setFriendDisplayName(response.data.displayname);
  };

  const fetchFriendData = async () => {
    await fetchAvatar();
    await fetchHeadline();
    await fetchDisplayname();
  };

  useEffect(() => {
    fetchFriendData();
  }, []);

  return (
    <div className="friend-container">
      <h1 className="friend-name">{friendDisplayName}</h1>
      <div className="friend-img-container">
        <img className="friend-img" src={friendAvatar} alt="" />
      </div>

      <h2 className="friend-status">{friendHeadline}</h2>
      <button onClick={handleUnfollowClick} className="unfollow-btn">
        Unfollow
      </button>
    </div>
  );
}

export default Friend;
