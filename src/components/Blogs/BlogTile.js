import React, { useEffect, useRef } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import styles from "./blogStyles";
import "./Blogs.css";

const BlogTile = (props) => {
  const pRef = useRef();
  let history = useHistory();
  const imageURL =
    props.details.coverImageUrl ||
    "https://indianlawwatch.com/wp-content/uploads/2020/05/BLOG.jpg";

  //Blog description
  let text = "";
  let description = props.description;
  if (description == null) return;
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
    const descText = text.replace("undefined", "");
    pRef.current.innerHTML = descText;
  }, []);

  return (
    <div className="card mb-3" style={{ margin: "1rem" }}>
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={imageURL} className="card-img" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              <Link style={styles.link} to={`/blogs/${props.details._id}`}>
                {props.details.title}
              </Link>
            </h5>
            {props.details.tags.map((tag, index) => (
              <span onClick={handleTagsClick} key={index} style={styles.tag}>
                {tag}
              </span>
            ))}
            <p ref={pRef} className="card-text"></p>
            <p style={styles.date}>{blogDate}</p>
            <button style={styles.blogOptionButton}>
              <Link
                style={styles.link}
                to={`/blogs/${props.details._id}/update`}
              >
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
      </div>
    </div>
  );
};

export default BlogTile;
