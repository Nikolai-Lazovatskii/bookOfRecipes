/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useState } from "react";
import "./Search.css";

const Search = ({ getSearch }) => {
  // State variable for search text input
  const [searchText, setSearchText] = useState("");

  // Handler to prevent form default submission
  const searchFormHandler = (event) => {
    event.preventDefault();
  };

  // Function to update search text with user input
  const changeText = (event) => {
    setSearchText(event.target.value);
  };

  // Function to send the search query and clear the search field
  const sendSearch = () => {
    getSearch(searchText);
    setSearchText("");
  };

  return (
    <form className="searchForm" onSubmit={searchFormHandler}>
      <input
        onChange={changeText} // Trigger changeText function on user input
        className="searchInput"
        type="text"
        placeholder="Search recipes..."
        value={searchText}
      />
      <button onClick={sendSearch} className="searchButton"> 
        Search
      </button>
    </form>
  );
};

export default Search;
