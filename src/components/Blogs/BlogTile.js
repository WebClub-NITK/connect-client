import React from 'react'
import {Link, useRouteMatch} from 'react-router-dom'
import styles from './blogStyles'

const BlogTile = ({details}) => {
    let match = useRouteMatch();
    return (
        <div style={styles.blogTile}>
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