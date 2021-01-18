import React, { useEffect, useState } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import styles from "./blogStyles";
import "./Blogs.css";
import Options from "./Options";

const BlogTile = (props) => {
  let text = "";
  let description = props.description;
  description.map((des) => {
    text = text + " " + des.data.text;
  });

  let blogDescription = text.replace(/[&]nbsp[;]/gi, " ");

  let blogDate = new Date(props.details.createdAt);
  let month = blogDate.toLocaleString("default", { month: "short" });
  const imageURL =
    props.details.coverImageUrl || "https://indianlawwatch.com/wp-content/uploads/2020/05/BLOG.jpg";

  let history = useHistory();

  const handleTagsClick = (e) => {
    window.scrollTo({left:0,top:0,behavior:'smooth'});
    const tag = e.target.innerHTML;
    history.push(`/blogs/tag/${tag}`);
  };

  return (
    <div style={styles.blogTile}>
      <img style={styles.blogImage} src={imageURL}></img>
      <div>
        <div className="blogHeader">
          <div>
            <h2 style={styles.title}>
              <Link style={styles.link} to={`/blogs/${props.details._id}`}>
                {props.details.title}
              </Link>
            </h2>
          </div>
          {props.profile ? <Options id={props.details._id} /> : ""}
        </div>
        {props.details.tags.map((tag, index) => (
          <span onClick={handleTagsClick} key={index} style={styles.tag}>
            {tag}
          </span>
        ))}
        <p>{blogDescription}</p>
        <p style={styles.date}>
          {blogDate.getDay()} {month}
        </p>
        <button style={{padding: '5px 10px',color: 'gray', border: '1px solid gray', background: 'white', borderRadius: '2px'}} ><Link style={styles.link} to={`/blogs/${props.details._id}/update`}>Update</Link></button>
      </div>
    </div>
  );
};

export default BlogTile;
