import React from 'react'
import PropTypes from "prop-types"
import { SERVER_URL } from '../../services/config'
import { Link } from 'react-router-dom'

const AuthorProfile = (props) => {

    if(!props.author_id) {
        return null
    }

    return (
        <div style={{display: 'flex'}}>
            <img style={{width: '50px', height: '50px', borderRadius: '100%'}} src={`${SERVER_URL}/profiles/${props.author_username}`} />
            <div style={{marginLeft: '10px', color: 'rgba(117, 117, 117, 1)', fontWeight: 'bold'}}>
                <p style={{marginBottom: '0'}}>{props.author_name}</p>
                <p style={{marginBottom: '0'}}><Link style={{color: 'rgba(117, 117, 117, 1)'}} to={`/blogs/profile/${props.author_id}`}>@{props.author_username}</Link></p>
            </div>
        </div>     
    )
}

AuthorProfile.propTypes = {
    author_id: PropTypes.node,
    author_name: PropTypes.node,
    author_username: PropTypes.node
}

export default AuthorProfile