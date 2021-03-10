/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import React from "react";
import "./Blogs.css";

const Pagination = ({ totalBlogs, blogsPerPage, paginate }) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalBlogs / blogsPerPage); i++) {
        pages.push(i);
    }

    return (
        <nav>
            <ul className="page-ul">
                {pages.map((number) => {
                    return (
                        <li
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                paginate(number);
                            }}
                            className="page-li"
                            key={number}
                        >
                            <span className="page-number">{number}</span>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Pagination;
