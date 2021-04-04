import React from "react";
import  {Link} from "react-router-dom";
import "./Blogs.css";
import PropTypes from "prop-types";
import AuthorProfile from "./AuthorProfile";
import VisibilityIcon from '@material-ui/icons/Visibility';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import { getDateString, countMinutesToRead, getDescription, sanitiseText } from "../../services/blogsService";

const NewBlogTile = (props) => {

    return (
        <div style={{width: '100%', border: '1px solid gray', borderRadius: '10px', padding: '20px', margin: '10px 0'}}>
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
                    <p className='gray'>{props.details.tags.map(tag => <span>#{tag} </span>)}</p>
                </div>
                <div className='blogs-meta-details' style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <AuthorProfile
                        author_id={props.details.author_username}
                        author_name={props.details.author_name}
                        author_username={props.details.author_username}
                    />
                    <p className='gray'>{getDateString(props.details.createdAt)}</p>
                    <p><VisibilityIcon /> {props.details.views}</p><p><ThumbUpIcon /> {props.details.likes.length}</p>
                    <p><TimelapseIcon /> {countMinutesToRead(JSON.parse(props.details.body).blocks)} mins</p>
                </div>
            </div>
        </div>
    )

};

NewBlogTile.propTypes = {
    details : PropTypes.node,
    description: PropTypes.node,
}

export default NewBlogTile;
