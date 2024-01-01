import { useEffect, useState } from "react";

import React from "react";

function SearchBar(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const { searchResults, setSearchResults, articles, setArticles } = props;

  const handleClear = (e) => {
    setSearchQuery("");
    setSearchResults("");
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Bottom is database code
  const handleSearch = () => {
    const filteredPosts = articles.filter((article) => {
      if (
        article.title.includes(searchQuery) ||
        article.text.includes(searchQuery) ||
        article.author.includes(searchQuery)
      ) {
        return article;
      }
    });

    setSearchResults(filteredPosts);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Enter Search"
        className="search-bar-input"
        value={searchQuery}
        onChange={handleInputChange}
        name=""
        id=""
      />
      <div className="search-buttons">
        <button onClick={handleClear} className="search-clear">
          Clear
        </button>
        <button onClick={handleSearch} className="search-submit">
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
