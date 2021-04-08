import React from "react";
import  {Link} from "react-router-dom";
import "./Blogs.css";
import PropTypes from "prop-types";
import AuthorProfile from "./AuthorProfile";
import VisibilityIcon from '@material-ui/icons/Visibility';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import { getDateString, countMinutesToRead, getDescription, deleteBlog } from "../../services/blogsService";
import {DropdownButton, Dropdown} from 'react-bootstrap'
import BookmarkButton from "./BookmarkButton";


const NewBlogTile = (props) => {

    return (
        <div className="new-blog-card" style={{width: '100%', padding: '20px', margin: '30px 0'}}>
            {
                !props.details.coverImageUrl ? null : 
                <div style={{width: '60%', margin: '10px auto'}}>
                    <img style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px'}} src={props.details.coverImageUrl}></img>
                </div>
            }
            <div className='details-container'>
                <p style={{fontSize: '2em', fontWeight: 'bold', lineHeight: '90%'}}><Link to={`/blogs/${props.details._id}`}>{props.details.title}</Link></p>
                <p className='gray'>{getDescription(JSON.parse(props.details.body).blocks)}</p>
                <div>
                    <p className='gray'>{props.details.tags ? props.details.tags.map(tag => tag ? <span>#{tag} </span>: null) : null}</p>
                </div>
                <div className='blogs-meta-details' style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <AuthorProfile
                        author_id={props.details.author_id}
                        author_name={props.details.author_name}
                        author_username={props.details.author_username}
                    />
                    <p className='gray'>{getDateString(props.details.createdAt)}</p>
                    <p><VisibilityIcon /> {props.details.views}</p><p><ThumbUpIcon /> {props.details.likes.length}</p>
                    <p><TimelapseIcon /> {countMinutesToRead(JSON.parse(props.details.body).blocks)} mins</p>
                    <BookmarkButton style={{marginLeft: 'auto'}} bookmarks={props.details.bookmarks} blogId={props.details._id} />
                    {props.withoptions ? <DropdownButton
                        className="dropdownButton"
                        id="dropdown-basic-button"
                        title=""
                        variant="light"
                    >
                        <Dropdown.Item><Link to={`/blogs/${props.details._id}/update`}>Update</Link></Dropdown.Item>
                        <Dropdown.Item onClick={() => {props.handleBlogDelete(props.details._id)}}>Delete</Dropdown.Item>
                    </DropdownButton> : null}
                </div>
            </div>
        </div>
    )

};

NewBlogTile.propTypes = {
    details : PropTypes.any,
    description: PropTypes.any,
}

export default NewBlogTile;
