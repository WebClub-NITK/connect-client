import React, { useEffect, useState } from "react";
import BlogTile from "./BlogTile";
import { getAllBlogs} from "../../services/blogsService";
import { Link, useHistory } from "react-router-dom";
import "./Blogs.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  let history = useHistory();
  useEffect(async () => {
    const blogs = await getAllBlogs();
    setBlogs(blogs);
  }, []);

  const handleChange = (e) => {
    const blogTitle = e.target.value;
    setBlogTitle(blogTitle);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchTitle = blogTitle;
    history.push(`/blogs/title/${searchTitle}`);
  };

  return (
    <div>
      <header className="nav_blogs">
        <h2 className="title">Blogs</h2>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={blogTitle}
            className="search_input"
            placeholder="search for blogs"
          ></input>
          <button className="search_button" type="submit">
            search
          </button>
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
            profile={false}
            description={JSON.parse(blog.body).blocks}
          />
        ))
      ) : (
        <p>No blogs to display</p>
      )}
    </div>
  );
};

export default Blogs;
