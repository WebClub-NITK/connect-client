import React, { useEffect, useState } from "react";
import BlogTile from "./BlogTile";
import { getAllBlogs } from "../../services/blogsService";
import { Link } from "react-router-dom";
import "./Blogs.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState(null);

  useEffect(async () => {
    const blogs = await getAllBlogs();
    setBlogs(blogs);
  }, []);

  function getDescription(blog) {
    const data = JSON.parse(blog.body);
    return data.blocks;
  }

  const handleClick = (e) => {
   e.preventDefault();
  }

  return (
    <div>
      <header className="nav_blogs">
        <h2 className="title">Blogs</h2>
        <form onSubmit={handleClick}>
          <input className='search_input' placeholder='search for blogs'></input>
          <button className='search_button' type='submit'>search</button>
        </form>
      </header>
      <Link to="/blogs/new">
        <button>Share an Idea</button>
      </Link>
      {blogs ? (
        blogs.map((blog) => (
          <BlogTile
            key={blog._id}
            details={blog}
            description={getDescription(blog)}
          />
        ))
      ) : (
        <p>No blogs to display</p>
      )}
    </div>
  );
};

export default Blogs;
