import React, { useEffect, useState } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import styles from "./blogStyles";

const BlogTile = (props) => {
  let blogDate = new Date(props.details.createdAt);
  let history = useHistory();

  const handleClick = (e) => {
     const tag = e.target.innerHTML;
     history.push(`/blogs/tag/${tag}`)
  }

  return (
    <div style={styles.blogTile}>
      <h2>
        <Link to={`/blogs/${props.details._id}`}>{props.details.title}</Link>
      </h2>
      <p>{blogDate.toLocaleDateString()}</p>
      {props.details.tags.map((tag, index) => (
        <span onClick={handleClick} key={index} style={styles.tag}>
          {tag}
        </span>
      ))}
      <ul>
        {props.description.map((blog, index) => (
          <li key={index}>{blog.data.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogTile;
