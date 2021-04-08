import React, { useEffect, useState } from "react";
import { getUserBlogs } from "../../services/blogsService";
import { useParams } from "react-router-dom";
import { deleteBlog } from "../../services/blogsService";
import LoadingComponent from "./LoadingComponent";
import BlogTile from "./BlogTile";

const UserBlogs = () => {

    const [userBlogs, setUserBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userid, setUserid] = useState(localStorage.getItem('UserId') ? localStorage.getItem('UserId') : "");
    const [checkBlogs, setCheck] = useState(false);

    let params = useParams();

    useEffect(async () => {
        const blogs = await getUserBlogs(params.userid);
        setUserBlogs(blogs);
        setLoading(true);
    }, [params, checkBlogs]);

    if (!loading) {
        return <LoadingComponent />
    }

    if (!userBlogs) {
        return <h2>This user has not posted any blogs</h2>
    }

    const handleBlogDelete = async (blogId) => {
        if (confirm("Are you sure you want to delete the blog?")) {
            const deletedBlog = await deleteBlog(blogId);
            if (deletedBlog.status == 204) {
                // notify("Blog deleted");
                console.log("deleted");
                let check = !checkBlogs;
                setCheck(check);
            } else {
                // notify("Couldn't delete the blog. Try again");
                console.log("error");
            }

        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>User Blogs</h2>
            {userBlogs ? (
                userBlogs
                    .map((blog) => (
                        <BlogTile
                            key={blog._id}
                            details={blog}
                            profile={false}
                            description={JSON.parse(blog.body).blocks}
                            options={userid === params.userid ? true : false}
                            handleBlogDelete={handleBlogDelete}
                        />
                    ))
            ) : (
                <p>No blogs to display</p>
            )}
        </div>
    );
}

export default UserBlogs;