import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBlogsByTitle } from "../../services/blogsService";
import BlogTile from "./BlogTile";

const SearchBlog = (props) => {
  const [searchBlog, setBlog] = useState(null);
  const [loaded, setLoaded] = useState(null);
  let params = useParams();

  useEffect(async () => {
    const blogs = await getBlogsByTitle(params.title);
    setLoaded(true);
    if (blogs) {
      setBlog(blogs);
    }
  }, []);

  if (!loaded) {
    return <h1>Loading</h1>;
  }

  if (!searchBlog) {
    return <h1>Not Found</h1>;
  }
  return (
    <div>
      <h2>Search results: {params.title}</h2>
      {searchBlog.length != 0 ? (
        searchBlog.map((blog) => (
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

export default SearchBlog;
