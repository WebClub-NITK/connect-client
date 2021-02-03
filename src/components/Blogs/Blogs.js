import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Blogs.css";
import { getAllBlogs, deleteBlog } from "../../services/blogsService";
import BlogTile from "./BlogTile";
import Pagination from "./Pagination";
import Header from "./Header";
import LiveSearch from "./LiveSearch";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogsUpdate, setBlogsUpdate] = useState(false);
  const [numberOfBlogs, setNumberOfBlogs] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const [blogsPerPage] = useState(10);

  let history = useHistory();

  useEffect(() => {
    setLoaded(false);
    setTimeout(async () => {
      const blogsData = await getAllBlogs(pageNumber);
      setBlogs(blogsData.blogs);
      setNumberOfBlogs(blogsData.count);
      setLoaded(true);
    }, 300);
  }, [pageNumber, blogsUpdate]);

  //Search blogs
  const handleChange = async (e) => {
    const blogTitle = e.target.value;
    setBlogTitle(blogTitle);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchTitle = blogTitle;
    if (searchTitle.length > 0) {
      history.push(`/blogs/search?q=${searchTitle}`);
    }
  };

  //Toast message for blog deletion
  toast.configure();
  const notify = (message) =>
    toast.info(message, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

  //function to delete blogs
  const handleBlogDelete = async (blogId) => {
    if (confirm("Are you sure you want to delete the blog?")) {
      const deletedBlog = await deleteBlog(blogId);
      if (deletedBlog.status == 204) {
        notify("Blog deleted");
      } else {
        notify("Couldn't delete the blog. Try again");
      }
      setBlogsUpdate(true);
    }
  };

  //function to navigate to other pages
  const paginate = (currentPageNumber) => {
    setPageNumber(currentPageNumber);
  };

  window.onpopstate = () => {};

  if (!loaded) {
    return <h1>Loading</h1>;
  }

  if (!blogs) {
    return <h4>Not found</h4>;
  }

  return (
    <div className="blogs_div">
      <Header />
      <LiveSearch />
      <div>
        {blogs ? (
          blogs
            .slice(0, 10)
            .map((blog) => (
              <BlogTile
                key={blog._id}
                details={blog}
                profile={false}
                description={JSON.parse(blog.body).blocks}
                handleBlogDelete={handleBlogDelete}
              />
            ))
        ) : (
          <p>No blogs to display</p>
        )}
      </div>

      <Pagination
        totalBlogs={numberOfBlogs}
        blogsPerPage={blogsPerPage}
        paginate={paginate}
      />
    </div>
  );
};

export default Blogs;
