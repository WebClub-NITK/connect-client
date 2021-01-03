import React, { useEffect, useState } from 'react'
import BlogTile from './BlogTile'
import { getAllBlogs } from '../../services/blogsService'
import { Link } from 'react-router-dom'

const Blogs = () => {
    const [blogs, setBlogs] = useState(null)

    useEffect(async () => {
        const blogs = await getAllBlogs()
        setBlogs(blogs)
    }, [])

    return (
        <div>
            <h1>Blogs</h1>
            <Link to='/blogs/idea/new'>
                <button>Share an Idea</button>
            </Link>
            {blogs ? blogs.map(blog => <BlogTile details={blog} />) : <p>No blogs to display</p>}
        </div>
    )
}

export default Blogs
