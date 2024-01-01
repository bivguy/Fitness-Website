import React from "react";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Post from "./Post";
import axios from "../../axios";

function PostBody(props) {
  const { articles, setArticles, fetchArticles, totalPages, setTotalPages } =
    props;

  const [searchResults, setSearchResults] = useState("");
  const [username, setUsername] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesToShow, setArticlesToShow] = useState([]);

  const incrementPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const decrementPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    setArticlesToShow(articles.slice(startIndex, endIndex));
  }, [currentPage, articles]);

  // getting the username on first load
  const fetchUsername = async () => {
    const response = await axios.get("/username");
    setUsername(response.data.username);
  };

  useEffect(() => {
    fetchUsername();
  }, []);

  const findSearchResults = () => {
    if (searchResults !== "") {
      let posts = searchResults.map((post) => {
        const owned = username === post.author;

        return (
          <Post
            key={post.pid}
            title={post.title}
            text={post.text}
            author={post.author}
            date={post.date}
            owned={owned}
            comments={post.comments.reverse()}
            fetchArticles={fetchArticles}
            image={post.image || ""}
            username={props.username}
          />
        );
      });
      return posts;
    } else {
      return "";
    }
  };

  let searchResultAllPosts = findSearchResults();

  return (
    <div className="main-body">
      <SearchBar
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        articles={articles}
        setArticles={setArticles}
      />
      <div className="post-container">
        {searchResults !== ""
          ? searchResultAllPosts
          : articlesToShow.map((post) => {
              const owned = username === post.author;
              return (
                <Post
                  key={post.pid}
                  title={post.title}
                  text={post.text}
                  author={post.author}
                  date={post.date}
                  pid={post.pid}
                  owned={owned}
                  comments={post.comments}
                  image={post.image || ""}
                  username={username}
                />
              );
            })}
      </div>
      <div className="pagination">
        <button onClick={() => decrementPage()}>Previous Page</button>
        <h1>{currentPage}</h1>
        <button onClick={() => incrementPage()}>Next Page</button>
      </div>
    </div>
  );
}

export default PostBody;
