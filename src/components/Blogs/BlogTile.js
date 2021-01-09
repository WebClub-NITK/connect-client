import React, { useEffect, useState } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import styles from "./blogStyles";

const BlogTile = (props) => {
  
  let text = "";
  let description = props.description;

  description.map((des) => {
    text = text +" "+ des.data.text;
  });

  let blogDescription = text.replace(/[&]nbsp[;]/gi," ");

  let blogDate = new Date(props.details.createdAt);
  let month = blogDate.toLocaleString("default", { month: "short" });
  const imageURL =
    "https://indianlawwatch.com/wp-content/uploads/2020/05/BLOG.jpg";

  let history = useHistory();
  
  const handleClick = (e) => {
    const tag = e.target.innerHTML;
    history.push(`/blogs/tag/${tag}`);
  };

  return (
    <div style={styles.blogTile}>
      <img style={styles.blogImage} src={imageURL}></img>
      <div>
        <h2 style={styles.title}>
          <Link style={styles.link} to={`/blogs/${props.details._id}`}>
            {props.details.title}
          </Link>
        </h2>
        {props.details.tags.map((tag, index) => (
          <span onClick={handleClick} key={index} style={styles.tag}>
            {tag}
          </span>
        ))}
        <p>{blogDescription}</p>
        <p style={styles.date}>
          {blogDate.getDay()} {month}
        </p>
      </div>
    </div>
  );
};

export default BlogTile;
