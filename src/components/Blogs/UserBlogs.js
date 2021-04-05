import React, { useEffect, useState } from "react";
import { getBookmarkedBlogs, getUserBlogs } from "../../services/blogsService";
import { useParams } from "react-router-dom";
import LoadingComponent from "./LoadingComponent";
import BlogTile from "./BlogTile";

const UserBlogs = () => {

    const [userBlogs, setUserBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [bookmarkedBlogs, setBookmarkedBlogs] = useState([]);
    const accessToken = localStorage.getItem('accessToken').toString();

    let params  = useParams();

    const userId = localStorage.getItem('UserId')
    const isLooggedInUser = userId === params.userid

    useEffect(async () => {
        const blogs = await getUserBlogs(params.userid);
        setUserBlogs(blogs);
        if(isLooggedInUser) {
            const bookmarks = await getBookmarkedBlogs(accessToken)
            setBookmarkedBlogs(bookmarks)
        }
        setLoading(true);
    }, [params]);

    if (!loading) {
        return <LoadingComponent />
    }

    if (!userBlogs) {
        return <h2>This user has not posted any blogs</h2>
    }


    return (
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <h2>User Blogs</h2>
            {userBlogs ? (
                userBlogs
                    .map((blog) => (
                        <BlogTile
                            key={blog._id}
                            details={blog}
                            profile={false}
                            description={JSON.parse(blog.body).blocks}
                        />
                    ))
            ) : (
                <p>No blogs to display</p>
            )}
            {isLooggedInUser ? (
                <>
                    <h2>Bookmarks</h2>
                    {bookmarkedBlogs ? (
                        bookmarkedBlogs
                            .map((blog) => (
                                <BlogTile
                                    key={blog._id}
                                    details={blog}
                                    profile={false}
                                    description={JSON.parse(blog.body).blocks}
                                />
                            ))
                    ) : (
                        <p>You don't have any bookmarks.</p>
                    )}
                </>
            ) : null}
        </div>
    );
}

export default UserBlogs;