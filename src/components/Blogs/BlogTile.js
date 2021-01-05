import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import styles from "./blogStyles";

const BlogTile = (props) => {
  let match = useRouteMatch();
  return (
    <div style={styles.blogTile}>
      <h2>
        <Link to={`${match.path}/${props.details._id}`}>
          {props.details.title}
        </Link>
      </h2>
      {props.details.tags.map((tag, index) => (
        <span key={index} style={styles.tag}>
          {tag}
        </span>
      ))}
      {props.description.map((blog, index) => (
        <p key={index}>{blog.data.text}</p>
      ))}
    </div>
  );
};

export default BlogTile;
