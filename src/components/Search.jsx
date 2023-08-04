import { useState } from "react";
import "./Search.css";

const Search = ({ getSearch }) => {
  const [searchText, setSearchText] = useState("");

  const searchFormHandler = (event) => {
    event.preventDefault();
  };

  const changeText = (event) => {
    setSearchText(event.target.value);
  };

  const sendSearch = () => {
    getSearch(searchText);
    setSearchText("");
  };

  return (
    <form className="searchForm" onSubmit={searchFormHandler}>
      <input
        onChange={changeText}
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
