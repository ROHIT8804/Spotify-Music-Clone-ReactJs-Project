import React from "react";
import { ReactComponent as SearchIcon } from "./assets/search.svg";

export const SearchBar = ({ onSearch }) => {
  return (
    <section className="searchbar-container">
      <input type="text" name="search" id="search" placeholder="search here"
        onChange={(e) => onSearch(e.target.value)}
      />
      {/* <SearchIcon /> */}
    </section>
  );
};