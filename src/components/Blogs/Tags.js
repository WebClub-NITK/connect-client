import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogTile from "./BlogTile";
import Pagination from "./Pagination";
import LoadingComponent from "./LoadingComponent";
import { getBlogsByTags } from "../../services/blogsService";
import "./Blogs.css";

const Tags = () => {
  const [blogs, setBlogs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [numberOfBlogs, setNumberOfBlogs] = useState(0);
  

 //pagination
  const [pageNumber, setPageNumber] = useState(1);
  const [blogsPerPage] = useState(10);

  let params = useParams();

  useEffect(async () => {
    setLoaded(false);
    setTimeout(getBlogs, 400);
  }, [params.tag,pageNumber]);

  const getBlogs = async () => {
    const tagBlogs = await getBlogsByTags(params.tag,pageNumber);
    setLoaded(true);
    if (tagBlogs) {
      setBlogs(tagBlogs.blogs);
      setNumberOfBlogs(tagBlogs.count);
    }
    setLoaded(true);
  };

  if (!loaded) {
    return <LoadingComponent/>
  }

  if (!blogs) {
    return <h4>Not found</h4>;
  }

  const paginate = (currentPageNumber) => {
    setPageNumber(currentPageNumber);
  };

  return (
    <div>
      <h2>Tags: {params.tag}</h2>
      {blogs.slice(0,10).map((blog) => (
        <BlogTile
          key={blog._id}
          details={blog}
          description={JSON.parse(blog.body).blocks}
        />
      ))}
      <Pagination
        totalBlogs={numberOfBlogs}
        blogsPerPage={blogsPerPage}
        paginate={paginate}
      />
    </div>
  );
};

export default Tags;
