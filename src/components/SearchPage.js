import React, { useState, useEffect } from "react";
import { getSearchBlogs } from "../services/blogsService";
import { search } from "../services/connectService";

const SearchPage = () => {
    const [searchItem, setSearchItem] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(async () => {
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const searchBlogs = await getSearchBlogs(searchItem);
        setBlogs(searchBlogs);
        let query = { username: searchItem };
        let searchUsers = await search({ query });
        setUsers(searchUsers);
    }

    return <div style={{ display: "flex", flexDirection: 'column', height: "100vh", alignItems: "center", }}>
        <h2>
            Search
      </h2>
        <form onSubmit={handleSubmit}>
            <input type="test" value={searchItem} onChange={(e) => setSearchItem(e.currentTarget.value)}></input>
            <button type="submit">Search</button>
        </form>
    </div>;
};

export default SearchPage;
