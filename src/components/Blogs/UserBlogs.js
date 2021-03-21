import React, { useEffect, useState } from "react";
import { getUserBlogs } from "../../services/blogsService";
import { useParams } from "react-router-dom";
import LoadingComponent from "./LoadingComponent";
import BlogTile from "./BlogTile";

const UserBlogs = () => {

    const [userBlogs, setUserBlogs] = useState([]);
    const [loading, setLoading] = useState(false);

    let params  = useParams();

    useEffect(async () => {
        const blogs = await getUserBlogs(params.userid);
        setUserBlogs(blogs);
        setLoading(true);
    }, [params]);

    console.log(userBlogs);

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
                    .slice(0, 10)
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
        </div>
    );
}

export default UserBlogs;