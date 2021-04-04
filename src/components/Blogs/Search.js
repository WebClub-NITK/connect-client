import React, { useEffect, useState } from "react";
import { useLocation} from "react-router-dom";
import { getSearchBlogs } from "../../services/blogsService";
import BlogTile from "../Blogs/BlogTile";
import Pagination from "./Pagination";
import LiveSearch from "./LiveSearch";
import LoadingComponent from "./LoadingComponent";
import NewBlogTile from "./NewBlogTile";

const Search = () => {
    const [searchBlogs, setBlogs] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const [pageNumber, setPageNumber] = useState(1);
    const [blogsPerPage] = useState(10);
    const [numberOfBlogs, setNumberOfBlogs] = useState(0);

    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const title = searchParams.get("q");

    useEffect(async () => {
        setLoaded(false);
        setTimeout(getBlogs, 300);
    }, [title, pageNumber]);

    const getBlogs = async () => {
        const searchBlogs = await getSearchBlogs(title, pageNumber);
        if (searchBlogs) {
            setBlogs(searchBlogs.blogs);
            setNumberOfBlogs(searchBlogs.count);
            setLoaded(true);
        }
    };

    if (!loaded) {
        return <LoadingComponent />;
    }

    if (!searchBlogs) {
        return <h2>No blogs found</h2>;
    }

    const paginate = (currentPageNumber) => {
        setPageNumber(currentPageNumber);
    };

    return (
        <div style={{maxWidth: '800px', margin: '20px auto'}}>
            <LiveSearch />
            <h2 style={{ textAlign: "center" }}>Search results: {title}</h2>
            {searchBlogs.length != 0 ? (
                searchBlogs
                    .slice(0, 10)
                    .map((blog) => (
                        <NewBlogTile
                            key={blog._id}
                            details={blog}
                            description={JSON.parse(blog.body).blocks}
                        />
                    ))
            ) : (
                <h4>No blogs found</h4>
            )}
            <Pagination
                totalBlogs={numberOfBlogs}
                blogsPerPage={blogsPerPage}
                paginate={paginate}
            />
        </div>
    );
};

export default Search;
