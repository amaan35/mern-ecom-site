import React from "react";

const Search = () => {
  return (
    <div className="flex">
      <div>
        <form>
          <label>Search term : </label>
          <input placeholder="search..." id="searchTerm" type="text" />
        </form>
      </div>
      <div>results</div>
    </div>
  );
};

export default Search;
