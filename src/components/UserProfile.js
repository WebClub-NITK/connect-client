import React, { useState, useEffect } from "react";
import { getAllBlogs } from "../services/blogsService";
import BlogTile from "./Blogs/BlogTile";

const UserProfile = () => {
  const [blogs, setBlogs] = useState(null);

  useEffect(async () => {
    let userBlogs = await getAllBlogs();
    if (userBlogs) {
      setBlogs(userBlogs);
    }
  }, []);

  return (
    <div>
      <h2>Welcome to your profile</h2>
      <div>
        <h3>Your blogs :</h3>
        {blogs ? (
          blogs.map((blog) => (
            <BlogTile
              key={blog._id}
              details={blog}
              profile={true}
              description={JSON.parse(blog.body).blocks}
            />
          ))
        ) : (
          <p>No blogs to display</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
