import React from 'react';

const Header = (props) => {
    return (
        <header className="nav_blogs">
        <h2 className="title">Blogs</h2>
        <form onSubmit={props.handleSubmit}>
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
      </header>
    );
}

export default Header;