import React, { useState } from "react";
import axios from "../../axios";

function CreatePost(props) {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postImg, setPostImg] = useState(null);

  const { articles, setArticles } = props;

  const clearPost = (e) => {
    e.preventDefault();
    setPostTitle("");
    setPostBody("");
    setPostImg(null);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (postTitle == "") {
      window.alert("Please provide a title for the post");
    } else {
      let payload = new FormData();
      payload.append("text", postBody);
      payload.append("title", postTitle);
      if (postImg) {
        payload.append("image", postImg);
      }
      const response = await axios.post("/article", payload);
    }

    const fetchArticles = async () => {
      try {
        const response = await axios.get(`/articles/`);

        setArticles(response.data.articles.reverse());
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();

    clearPost(e);
  };

  function handleImageChange(e) {
    if (e.target.files.length > 0) {
      setPostImg(e.target.files[0]);
    } else setPostImg(null);
  }

  return (
    <div className="new-post-container">
      <div>
        <h1>Write New Post</h1>
        <form action="" className="new-post-form">
          <input
            className="new-post-title"
            type="text"
            onChange={(e) => setPostTitle(e.target.value)}
            value={postTitle}
            placeholder="Post Title"
          />
          <textarea
            className="new-post-body"
            type="text"
            onChange={(e) => setPostBody(e.target.value)}
            value={postBody}
            placeholder="Post Body"
          />
          <input
            className="new-post-img"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
            name=""
            id=""
          />
          <div className="new-post-buttons">
            <button className="action post-button" onClick={handlePost}>
              Post
            </button>
            <button className="action post-comment" onClick={clearPost}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
