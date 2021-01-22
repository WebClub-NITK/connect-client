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
              onClick={() => {
                paginate(number);
              }}
              className="page-li"
              key={number}
            >
              <a className="page-number" href="#">
                {number}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
