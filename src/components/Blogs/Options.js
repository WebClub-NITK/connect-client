import React from "react";
import { Link } from "react-router-dom";
import styles from "./blogStyles";

const Options = (props) => {
  let id = props.id;
  return (
    <div className="dropdown">
      <button class="dropbtn">Options</button>
      <div className="options-content">
        <Link to={`/blogs/update/${id}`} style={styles.option}>
          Update
        </Link>
        <Link
          onClick={() => {
            alert("Are you sure you want to delete the post?");
          }}
          style={styles.option}
        >
          Delete
        </Link>
      </div>
    </div>
  );
};

export default Options;
