import React from "react";

const SearchBar = (props) => {
  return (
    <form className="search_form" onSubmit={props.handleSubmit}>
      <input
        onChange={props.handleChange}
        value={props.value}
        className="search_input"
        placeholder="search for blogs"
      ></input>
      <button className="search_button" type="submit">
        search
      </button>
    </form>
  );
};

export default SearchBar;
