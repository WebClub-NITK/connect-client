import axios from 'axios'

const url = 'http://localhost:3001/blogs'

const getAllBlogs = async () => {
    const blogs = await axios.get(url)
    return blogs.data
}

const saveBlog = async ({title, body, tags}) => {
    const savedBlog = await axios.post(url, {title, body, tags})
    return savedBlog.data
}
export {
    saveBlog,
    getAllBlogs
}