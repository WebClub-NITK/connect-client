import React from 'react'
import {Link, useRouteMatch} from 'react-router-dom'

const BlogTile = ({details}) => {
    let match = useRouteMatch();
    return (
        <div style={{margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
            <h2>
                <Link to={`${match.path}/${details._id}`}>{details.title}</Link>
            </h2>
            <p>
                {details.body}
            </p>
        </div>
    )
}

export default BlogTile