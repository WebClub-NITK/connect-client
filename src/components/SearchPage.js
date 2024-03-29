import React, { useState, useEffect, useRef } from "react";
import { getSearchBlogs } from "../services/blogsService";
import { search, RetreiveInfo } from "../services/connectService";
import NewBlogTile from "../components/Blogs/NewBlogTile";
import "../components/Blogs/Blogs.css";
import ProfileTile from "../components/Blogs/ProfileTile";

const SearchPage = () => {
    const [searchItem, setSearchItem] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [users, setUsers] = useState([]);
    const [check, setCheck] = useState(false);
    const [jsonInfo, setJsonInfo] = useState(null);

    let userRef = useRef();
    let blogsRef = useRef();

    useEffect(async () => {
        const jsonVal = await RetreiveInfo();
        console.log(jsonVal);
        setJsonInfo(jsonVal);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (searchItem.length > 0) {
            const searchBlogs = await getSearchBlogs(searchItem);
            setBlogs(searchBlogs.blogs);
            let query = { username: searchItem };
            let searchUsers = await search({ query });
            setUsers(searchUsers);
            console.log(searchUsers);
        }
    };

    const handleClick = (val) => {
        setCheck(val);
        if (val === false) {
            if (!(blogsRef.current.classList.contains('selected'))) {
                blogsRef.current.classList.add('selected');
            }
            userRef.current.classList.remove('selected');
        } else {
            if (!(userRef.current.classList.contains('selected'))) {
                userRef.current.classList.add('selected');
            }
            blogsRef.current.classList.remove('selected');
        }
    };

    return (
        <div className="search_div">
            <h2 style={{textAlign:'center'}}>Search</h2>
            <form className="live_search_div" onSubmit={handleSubmit}>
                <div className="form_div">
                    <input
                        type="test"
                        value={searchItem}
                        onChange={(e) => setSearchItem(e.currentTarget.value)}
                    ></input>
                    <button className="searchButton" type="submit">
                        Search
          </button>
                </div>
            </form>
            <div className="search_sub_div">
                <div className="search_menu">
                    <p className="selected" ref={blogsRef} onClick={() => handleClick(false)}>Blogs</p>
                    <p ref={userRef} onClick={() => handleClick(true)}>Users</p>
                </div>
                <div className="search_results_div">
                    {check ? (
                        <div className="search_user_div">
                            {users.length > 0 ? (
                                users.map((user,i) => (
                                    <ProfileTile key={i} user={user} jsonInfo={jsonInfo} />
                                ))
                            ) : (
                                <h3 style={{ textAlign: "center" }}>Users not found</h3>
                            )}
                        </div>
                    ) : (
                        <div style={{maxWidth: '800px', margin: '20px auto'}}>
                            {blogs.length > 0 ? (
                                blogs.map((blog) => (
                                    <NewBlogTile
                                        key={blog._id}
                                        details={blog}
                                        description={JSON.parse(blog.body).blocks}
                                    />
                                ))
                            ) : (
                                <h3 style={{ textAlign: "center" }}>Blogs not found</h3>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
