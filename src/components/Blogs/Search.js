import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { getSearchBlogs } from "../../services/blogsService";
import BlogTile from "../Blogs/BlogTile";
import Pagination from "./Pagination";
import LiveSearch from "./LiveSearch";

const Search = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [searchBlogs, setBlogs] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const [blogsPerPage] = useState(10);

  let history = useHistory();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const title = searchParams.get("q");

  useEffect(async () => {
    const blogs = await getSearchBlogs(title);
    setLoaded(true);
    if (blogs) {
      setBlogs(blogs);
    }
  }, [title]);

  if (!loaded) {
    return <h2>Loading!</h2>;
  }

  if (!searchBlogs) {
    return <h2>No blogs found</h2>;
  }

  const indexOfLastBlog = pageNumber * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;

  const paginate = (currentPageNumber) => {
    setPageNumber(currentPageNumber);
  };

  return (
    <div>
      <LiveSearch/>
      <h2 style={{ textAlign: "center" }}>Search results: {title}</h2>
      {searchBlogs.length != 0 ? (
        searchBlogs
          .slice(indexOfFirstBlog, indexOfLastBlog)
          .map((blog) => (
            <BlogTile
              key={blog._id}
              details={blog}
              description={JSON.parse(blog.body).blocks}
            />
          ))
      ) : (
        <h4>No blogs found</h4>
      )}
      <Pagination
        totalBlogs={searchBlogs.length}
        blogsPerPage={blogsPerPage}
        paginate={paginate}
      />
    </div>
  );
};

export default Search;
