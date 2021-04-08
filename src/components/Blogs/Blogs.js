import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Blogs.css";
import BlogTile from "./BlogTile";
import Pagination from "./Pagination";
// import Header from "./Header";
// import MainNavbar from "../MainNavbar";
import LiveSearch from "./LiveSearch";
import LoadingComponent from "./LoadingComponent";
import { getAllBlogs } from "../../services/blogsService";
import NewBlogTile from "./NewBlogTile";
import { Button } from "react-bootstrap";

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [numberOfBlogs, setNumberOfBlogs] = useState(0);
    const [loaded, setLoaded] = useState(false);

    const [pageNumber, setPageNumber] = useState(1);
    const [blogsPerPage] = useState(10);
    const userId = localStorage.getItem('UserId')

    useEffect(() => {
        setLoaded(false);
        setTimeout(async () => {
            const blogsData = await getAllBlogs(pageNumber);
            setBlogs(blogsData.blogs);
            setNumberOfBlogs(blogsData.count);
            setLoaded(true);
        }, 300);
    }, [pageNumber]);

    //function to navigate to other pages
    const paginate = (currentPageNumber) => {
        setPageNumber(currentPageNumber);
    };

    window.onpopstate = () => { };

    if (!loaded) {
        return <LoadingComponent />;
    }

    if (!blogs) {
        return <h4>Not found</h4>;
    }

    return (
        <div className="blogs_div">
            <p style={{textAlign: 'center'}}>
                <Link to="/blogs/new">
                    <button className="new-blog-button">Share an idea</button>
                </Link>
                <Link to={`/blogs/profile/${userId}`}>
                    <button className="new-blog-button">Manage Blogs</button>
                </Link>

            </p>
            {/* <p style={{textAlign: 'center', margin: '10px'}}>
                
                    <Button><b>Manage Blogs</b></Button>
                </Link>
            </p> */}
            <LiveSearch />
            <div style={{maxWidth: '800px', margin: '20px auto'}}>
                {blogs ? (
                    blogs
                        .slice(0, 10)
                        .map((blog) => (
                            <div>
                                <NewBlogTile
                                key={blog._id}
                                details={blog}
                                profile={false}
                                description={JSON.parse(blog.body).blocks}
                                />
                            </div>
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
