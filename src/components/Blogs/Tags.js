import React, { useEffect, useState } from "react";
import { getBlogsByTags } from "../../services/blogsService";
import { useParams } from "react-router-dom";
import BlogTile from "./BlogTile";
import Pagination from "./Pagination";
import "./Blogs.css";

const Tags = () => {
  const [blogs, setBlogs] = useState([]);
  const [loaded, setLoaded] = useState(false);

  //pagination
  const [pageNumber, setPageNumber] = useState(1);
  const [blogsPerPage] = useState(10);

  let params = useParams();

  useEffect(async () => {
    setLoaded(false);
    setTimeout(getBlogs, 400);
  }, [params.tag]);

  const getBlogs = async () => {
    const tagBlogs = await getBlogsByTags(params.tag);
    setLoaded(true);
    if (tagBlogs) {
      setBlogs(tagBlogs);
    }
    setLoaded(true);
  };

  if (!loaded) {
    return <h1>Loading</h1>;
  }

  if (!blogs) {
    return <h4>Not found</h4>;
  }

  const indexOfLastBlog = pageNumber * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;

  const paginate = (currentPageNumber) => {
    setPageNumber(currentPageNumber);
  };

  return (
    <div>
      <h2>Tags: {params.tag}</h2>
      {blogs.slice(indexOfFirstBlog, indexOfLastBlog).map((blog) => (
        <BlogTile
          key={blog._id}
          details={blog}
          description={JSON.parse(blog.body).blocks}
        />
      ))}
      <Pagination
        totalBlogs={blogs.length}
        blogsPerPage={blogsPerPage}
        paginate={paginate}
      />
    </div>
  );
};

export default Tags;
