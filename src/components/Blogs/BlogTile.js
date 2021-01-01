import React from 'react'

const BlogTile = ({details}) => {
    return (
        <div style={{margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
            <h2>
                {details.title}
            </h2>
            <p>
                {details.body}
            </p>
        </div>
    )
}

export default BlogTile