import React, { useState, useEffect } from "react";
import { getSearchBlogs } from "../services/blogsService";
import { search } from "../services/connectService";
import BlogTile from "../components/Blogs/BlogTile";
import "../components/Blogs/Blogs.css";

const SearchPage = () => {
    const [searchItem, setSearchItem] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [users, setUsers] = useState([]);
    const [check, setCheck] = useState(false);

    useEffect(async () => { }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (searchItem.length > 0) {
            const searchBlogs = await getSearchBlogs(searchItem);
            setBlogs(searchBlogs.blogs);
            let query = { username: searchItem };
            let searchUsers = await search({ query });
            console.log(searchUsers);
            setUsers(searchUsers);
        }
    };

    const handleClick = (val) => {
        setCheck(val);
    };

    return (
        <div className="search_div">
            <h2>Search</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="test"
                    value={searchItem}
                    onChange={(e) => setSearchItem(e.currentTarget.value)}
                ></input>
                <button type="submit">Search</button>
            </form>
            <div className="search_sub_div">
                <div className="search_menu">
                    <h2 onClick={() => handleClick(false)}>Blogs</h2>
                    <h2 onClick={() => handleClick(true)}>Users</h2>
                </div>
                <div className="search_results_div">
                    {check ? (
                        <div>
                            {users.length > 0 ? (
                                users.map((user) => <p>{user.Username}</p>)
                            ) : (
                                <p>User not found</p>
                            )}
                        </div>
                    ) : (
                        <div>
                            {blogs.length > 0 ? (
                                blogs.map((blog) => (
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
