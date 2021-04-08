import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import LoadingComponent from "./LoadingComponent";
import { getBlogsByTags } from "../../services/blogsService";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import "./Blogs.css";
import NewBlogTile from "./NewBlogTile";

const BlogsFromTag = (props) => {
    const [blogs, setBlogs] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [numberOfBlogs, setNumberOfBlogs] = useState(0);


    //pagination
    const [pageNumber, setPageNumber] = useState(1);
    const [blogsPerPage] = useState(10);

    let params = props

    useEffect(async () => {
        setLoaded(false);
        setTimeout(getBlogs, 400);
    }, [params.tag, pageNumber]);

    const getBlogs = async () => {
        const tagBlogs = await getBlogsByTags(params.tag, pageNumber);
        setLoaded(true);
        if (tagBlogs) {
            setBlogs(tagBlogs.blogs);
            setNumberOfBlogs(tagBlogs.count);
        }
        setLoaded(true);
    };

    if (!loaded) {
        return <LoadingComponent />
    }

    if (!blogs) {
        return <h4>Not found</h4>;
    }

    if(blogs.length == 0) {
        return (
            <div style={{textAlign: 'center', padding: '10px', border: '1px solid gray', borderRadius: '5px'}}>
                <h2>No Blogs Available.</h2>
                <Link to={`/blogs/new?tag=${params.tag}`}>Add Blog on this topic.</Link>
            </div>
        )
    }

    const paginate = (currentPageNumber) => {
        setPageNumber(currentPageNumber);
    };

    return (
        <div>
            <div style={{textAlign: 'center', padding: '10px', border: '1px solid gray', borderRadius: '5px'}}>
                <h2>Blogs on: {params.tag}</h2>
                <Link to={`/blogs/new?tag=${params.tag}`}>Add Blog on this topic.</Link>
            </div>
            
            {blogs.slice(0, 10).map((blog) => (
                <NewBlogTile
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

BlogsFromTag.PropTypes = {
    tag: PropTypes.string
}

export default BlogsFromTag;
