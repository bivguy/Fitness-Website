import React, { useState, useEffect } from "react";
import axios from "../../axios";
import Friend from "./Friend";

function FriendList(props) {
  const { friends, setFriends, newFriendName, setNewFriendName } = props;

  const handleAddClick = async () => {
    if (newFriendName !== "") {
      if (friends.includes(newFriendName)) {
        window.alert("User already a friend");
      } else if (newFriendName === props.loggedUsername) {
        window.alert("Cannot add yourself as a friend");
      } else {
        const response = await axios.put(`/following/${newFriendName}`);
        if (response.data.error === "User to follow not found") {
          window.alert("User not found");
        } else {
          setFriends((friends) => [...friends, newFriendName]);
        }
      }
    }
  };

  const handleFriendInputChange = (e) => {
    setNewFriendName(e.target.value);
  };

  const fetchUpdatedFriends = async (username) => {
    const response = await axios.delete(`/following/${username}`);

    if (!response.data.following) {
      setFriends([]);
    } else {
      setFriends(response.data.following);
    }
  };

  const handleRemoveFriend = async (username) => {
    await fetchUpdatedFriends(username);
  };

  return (
    <div className="friend-list-container">
      <div className="friends">
        {friends.map((friend) => (
          <Friend
            key={friend}
            friend={friend}
            friends={friends}
            handleRemoveFriend={handleRemoveFriend}
          />
        ))}
      </div>

      <div className="add-friend">
        <input
          value={newFriendName}
          onChange={handleFriendInputChange}
          type="text"
          placeholder="User"
        />
        <button className="add-friend-btn" onClick={handleAddClick}>
          Add
        </button>
      </div>
    </div>
  );
}

export default FriendList;
