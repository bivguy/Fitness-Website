import React, { useState, useEffect } from "react";
import MainHeader from "../components/mainPageComponents/MainHeader";
import "../components/form-components/styles.css";
import ProfileStatus from "../components/mainPageComponents/ProfileStatus";
import "../App.css";
import PostBody from "../components/mainPageComponents/PostBody";
import CreatePost from "../components/mainPageComponents/CreatePost";
import FriendList from "../components/profileComponents/FriendList";
import axios from "../axios";
import { set } from "mongoose";

function MainPage() {
  const [friends, setFriends] = useState([]);
  const [newFriendName, setNewFriendName] = useState("");
  const [friendsInfo, setFriendsInfo] = useState([]);
  const [postState, setPostState] = useState([]);
  const [loggedProfileInfo, setLoggedProfileInfo] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  // Get the list of friends on initial render and profile info
  const fetchUserData = async () => {
    try {
      // Fetch user's headline and update status state
      const response = await axios.get(`/profile`);
      setLoggedProfileInfo(response.data);
      return response;
      // setting the things the things
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchFriends = async () => {
    const response = await axios.get(`/following/`);
    setFriends(response.data.following);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchFriends();
      await fetchUserData();
    };
    fetchData();
  }, []);

  // Below is everything with the backend involved getting articles

  const [articles, setArticles] = useState([]);
  const fetchArticles = async () => {
    try {
      const response = await axios.get(`/articles/`);

      setArticles(response.data.articles.reverse());
      setTotalPages(Math.ceil(articles.length / 10));
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [friends]);

  return (
    <div>
      <MainHeader />
      <div className="sidebar">
        <ProfileStatus
          loggedProfileInfo={loggedProfileInfo}
          fetchUserData={fetchUserData}
          setLoggedProfileInfo={setLoggedProfileInfo}
        />
        <FriendList
          friends={friends}
          setFriends={setFriends}
          newFriendName={newFriendName}
          setNewFriendName={setNewFriendName}
          friendsInfo={friendsInfo}
          setFriendsInfo={setFriendsInfo}
        />
      </div>
      <PostBody
        friends={friends}
        setFriends={setFriends}
        articles={articles}
        setArticles={setArticles}
        fetchArticles={fetchArticles}
        loggedProfileInfo={loggedProfileInfo}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
      />
      <div className="right-sidebar">
        <CreatePost
          postState={postState}
          setPostState={setPostState}
          articles={articles}
          setArticles={setArticles}
        />
      </div>
    </div>
  );
}

export default MainPage;
