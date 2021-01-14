import React, { useEffect, useState } from "react";
import BlogTile from "./BlogTile";
import { getAllBlogs } from "../../services/blogsService";
import { Link, useHistory } from "react-router-dom";
import "./Blogs.css";
import Header from "./Header";

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
    history.push(`/blogs/search?title=${searchTitle}`);
  };

  return (
    <div>
      <Header
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        value={blogTitle}
      />
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
