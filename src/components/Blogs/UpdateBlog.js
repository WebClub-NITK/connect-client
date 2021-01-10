import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "../../services/blogsService";

const UpdateBlog = () => {
  let { blogId } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [blog, setBlog] = useState(null);

  useEffect(async () => {
    const blog = await getBlogById(blogId);
    setLoaded(true);
    if (blog) {
      setBlog(blog);
    }
  }, []);

  if (!loaded) {
    return <h1>Loading</h1>;
  }

  if (!blog) {
    return <h1>Not Found</h1>;
  }

  return (
    <div>
      <h2>Update : {blogId}</h2>
    </div>
  );
};

export default UpdateBlog;
