import React, { useEffect, useState } from "react";
import BlogTile from "./BlogTile";
import { getAllBlogs } from "../../services/blogsService";
import { Link, useHistory } from "react-router-dom";
import "./Blogs.css";
import Pagination from "./Pagination";
import Header from "./Header";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogTitle, setBlogTitle] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [blogsPerPage] = useState(5);
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

  //Get the first and last index of current page of the blogs
  const indexOfLastBlog = pageNumber * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;

  //function to navigate to other pages
  const paginate = (currentPageNumber) => {
    setPageNumber(currentPageNumber);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
        blogs
          .slice(indexOfFirstBlog, indexOfLastBlog)
          .map((blog) => (
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
      <Pagination
        totalBlogs={blogs.length}
        blogsPerPage={blogsPerPage}
        paginate={paginate}
      />
    </div>
  );
};

export default Blogs;
