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

    function getDescription(blog){
        const data = JSON.parse(blog.body)
        return data.blocks;
    }

    return (
        <div>
            <header>
                <h1>Blogs</h1>
            </header>
            <Link to='/blogs/new'>
                <button>Share an Idea</button>
            </Link>
            {blogs ? blogs.map(blog => <BlogTile key={blog._id} details={blog} description={getDescription(blog)} />) : <p>No blogs to display</p>}
        </div>
    )
}

export default Blogs

