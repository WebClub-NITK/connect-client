import React, { useEffect, useRef } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import styles from "./blogStyles";
import "./Blogs.css";
import Options from "./Options";

const BlogTile = (props) => {
  const pRef = useRef();
  let history = useHistory();
  const imageURL =
    props.details.coverImageUrl ||
    "https://indianlawwatch.com/wp-content/uploads/2020/05/BLOG.jpg";

  //Blog description
  let text = "";
  let description = props.description;
  description.map((des) => {
    text = text + " " + des.data.text;
  });

  //blog date
  let date = new Date(props.details.createdAt);
  const blogDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    weekday: "short",
  });

  const handleTagsClick = (e) => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    const tag = e.target.innerHTML;
    history.push(`/blogs/tag/${tag}`);
  };

  useEffect(() => {
    const descText = text.replace('undefined','');
    pRef.current.innerHTML = descText;
  }, []);

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
        <p ref={pRef} className="blog-des"></p>
        <p style={styles.date}>{blogDate}</p>
        <button style={styles.blogOptionButton}>
          <Link style={styles.link} to={`/blogs/${props.details._id}/update`}>
            Update
          </Link>
        </button>
        <button
          style={styles.blogOptionButton}
          onClick={() => {
            props.handleBlogDelete(props.details._id);
          }}
        >
          <span style={styles.link}>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default BlogTile;
