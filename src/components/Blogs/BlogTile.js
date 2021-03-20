/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import React, { useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./blogStyles";
import "./Blogs.css";
import { Button, DropdownButton,Dropdown } from "react-bootstrap";
import { SERVER_URL } from "../../services/config";

const BlogTile = (props) => {
    const pRef = useRef();
    const updateURL = `/blogs/${props.details._id}/update`;
    let history = useHistory();
    const imageURL =
        props.details.coverImageUrl ||
        "https://indianlawwatch.com/wp-content/uploads/2020/05/BLOG.jpg";

    //blog date
    let date = new Date(props.details.createdAt);
    const blogDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        weekday: "short",
    });

    //navigate to tags page
    const handleTagsClick = (e) => {
        const tag = e.target.innerHTML;
        history.push({ pathname: `/blogs/tag/${tag}`, data: { pageNumber: 1 } });
    };

    //Blog description
    let text = "";
    let description = props.description;
    if (description == null) return;
    description.map((des) => {
        text = text + " " + des.data.text;
    });

    useEffect(() => {
        const descText = text.replace("undefined", "");
        pRef.current.innerHTML = descText.substring(0, 400).trim();
    }, []);

    return (
        <div className="blog-card">
            <img className="blog-img" src={imageURL}></img>
            <div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <h3 className="card-title">
                        <Link style={styles.link} to={`/blogs/${props.details._id}`}>
                            {props.details.title}
                        </Link>
                    </h3>
                    <DropdownButton
                        className="dropdownButton"
                        id="dropdown-basic-button"
                        title="Options"
                        variant="secondary"
                    >
                        <Dropdown.Item href={updateURL}>Update</Dropdown.Item>
                        <span
                            onClick={() => {
                                props.handleBlogDelete(props.details._id);
                            }}
                        >
                            <Dropdown.Item>Delete</Dropdown.Item>
                        </span>
                    </DropdownButton>
                </div>
                {props.details.tags.map((tag, index) => (
                    <span
                        onClick={handleTagsClick}
                        key={index}
                        style={styles.tag}
                        className="badge bg-secondary"
                    >
                        {tag}
                    </span>
                ))}
                <p ref={pRef} className="blog_des"></p>

                <p style={styles.date}>{blogDate}</p>
                <img style={{width: '50px', borderRadius: '5px'}} src={`${SERVER_URL}/profiles/${props.details.author_username}`} />
                <p>{props.details.author_name} @{props.details.author_username}</p>
                <Button
                    onClick={() => {
                        history.push(`/blogs/${props.details._id}`);
                    }}
                    bg="dark"
                    variant="dark"
                >
                    Read more
                </Button>
            </div>
        </div>
    );
};

export default BlogTile;
