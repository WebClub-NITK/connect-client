import React, { useRef } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const nav = useRef();

  return (
    <div ref={nav} className="nav_blogs">
      <h2 style={{margin:"0"}}>Blogs</h2>
      <Link to="/blogs/new">
        <button className="new-blog-button">Share an idea</button>
      </Link>
    </div>
  );
};

export default Header;

{
  /* <div className="header_div">
      
      <div className="intro">
        <div className="intro_text">
          <h1>Share your passion and ideas here.</h1>
        </div>
        <Link to="/blogs/new">
          <button className="new-blog-button">Share an idea</button>
        </Link>
      </div>
    </div> */
}
