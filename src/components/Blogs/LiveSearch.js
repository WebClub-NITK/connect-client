import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { getBlogTitles } from "../../services/blogsService";
import "./Blogs.css";

const LiveSearch = () => {
    const [searchValue, setSearchValue] = useState("");
    const [blogDetails, setBlogDetails] = useState([]);
    const liveDiv = useRef();

    let history = useHistory();

    useEffect(async () => {
        handleInstantSearch();
    }, [searchValue]);

    //Adds search result to search_items div from blog titles
    const handleInstantSearch = () => {
        const titleBlogs = blogDetails;
        const sItems = liveDiv.current;
        if (sItems != null) {
            const liveItems = sItems.querySelector(".search_items");
            const searchResults = liveItems.getElementsByTagName("li");
            if (searchValue != "") {
                let itemsArray = titleBlogs.filter((suggestion) => {
                    return suggestion.title
                        .trim()
                        .toLocaleLowerCase()
                        .includes(searchValue.toLocaleLowerCase().trim());
                });

                itemsArray = itemsArray.map((item) => {
                    return `<li data-id=${item._id}>${item.title}</li>`;
                });

                if (itemsArray.length > 0) {
                    liveItems.innerHTML = itemsArray.join("");
                } else {
                    liveItems.innerHTML = `<li data-id=search>${searchValue}</li>`;
                }

                const searchItems = Array.from(searchResults);

                searchItems.forEach((item) => {
                    item.addEventListener("click", handleClick);
                });
            } else {
                liveItems.innerHTML = "";
            }
        }
    };

    //function to handle click on the search results
    const handleClick = (e) => {
        const blogId = e.target.dataset.id;
        if (blogId != "search") {
            history.push(`/blogs/${blogId}`);
        } else {
            history.push(`/blogs/search?q=${e.target.innerHTML}`);
        }
    };

    //handles change in search value
    const handleChange = async (e) => {
        const value = e.target.value.trim();
        setSearchValue(value);
        if (value.length > 0) {
            const blogDetails = await getBlogTitles(value);
            setBlogDetails(blogDetails);
        }
    };

    //handles submit of search form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchValue.length > 0) {
            history.push(`/blogs/search?q=${searchValue}`);
        }
        setSearchValue("");
    };

    return (
        <form ref={liveDiv} onSubmit={handleSubmit} className="live_search_div">
            <div
                className="form_div"
            >
                <input
                    onChange={handleChange}
                    type="text"
                    placeholder="search blogs"
                ></input>
                <button className="searchButton" type="submit">
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>

            <div className="search_items"></div>
        </form>
    );
};

export default LiveSearch;
