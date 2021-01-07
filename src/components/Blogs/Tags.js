import React, { useEffect, useState } from "react";
import { getBlogsByTags } from "../../services/blogsService";
import { useParams } from "react-router-dom";
import BlogTile from "./BlogTile";

const Tags = () => {
  const [blogs, setBlogs] = useState(null);
  const [loaded, setLoaded] = useState(false);
  let params = useParams();

  useEffect(async () => {
    const tagBlogs = await getBlogsByTags(params.tag);
    setLoaded(true);

    if (tagBlogs) {
      setBlogs(tagBlogs);
    }
  }, []);

  if (!loaded) {
    return <h1>Loading</h1>;
  }

  if (!blogs) {
    return <h4>Not found</h4>;
  }

  return (
    <div>
      <h2>Tags: {params.tag}</h2>
      {blogs.map((blog) => (
        <BlogTile
          key={blog._id}
          details={blog}
          description={JSON.parse(blog.body).blocks}
        />
      ))}
    </div>
  );
};

export default Tags;
