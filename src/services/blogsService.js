import axios from 'axios'

const url = 'http://localhost:3001/blogs'

const getAllBlogs = async () => {
    const blogs = await axios.get(url)
    return blogs.data
}

export {
    getAllBlogs
}