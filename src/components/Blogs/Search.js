import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { getSearchBlogs } from "../../services/blogsService";
import BlogTile from "../Blogs/BlogTile";
import Header from "./Header";

const Search = () => {
  const [blogTitle, setBlogTitle] = useState("");
  let history = useHistory();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const title = searchParams.get("title");

  const [searchBlogs, setBlogs] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(async () => {
    const blogs = await getSearchBlogs(title);
    console.log(blogs);
    setLoaded(true);
    if (blogs) {
      setBlogs(blogs);
    }
  });

  if (!loaded) {
    return <h2>Loading!</h2>;
  }

  if (!searchBlogs) {
    return <h2>No blogs found</h2>;
  }

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
      <h2>Search results: {title}</h2>
      {searchBlogs.length != 0 ? (
        searchBlogs.map((blog) => (
          <BlogTile
            key={blog._id}
            details={blog}
            description={JSON.parse(blog.body).blocks}
          />
        ))
      ) : (
        <h4>No blogs found</h4>
      )}
    </div>
  );
};

export default Search;
