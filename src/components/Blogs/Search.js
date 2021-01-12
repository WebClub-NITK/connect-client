import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSearchBlogs } from "../../services/blogsService";
import BlogTile from "../Blogs/BlogTile";

const Search = () => {
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
  }, []);

  if (!loaded) {
    return <h2>Loading!</h2>;
  }

  if (!searchBlogs) {
    return <h2>No blogs found</h2>;
  }

  return (
    <div>
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
