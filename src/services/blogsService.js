import axios from "axios";

import { SERVER_URL } from "./config";

const url = SERVER_URL + "/blogs";

const getAllBlogs = async (pageNumber) => {
    const blogsData = await axios.get(`${url}/page/${pageNumber}`);
    return blogsData.data;
};

const saveBlog = async (accessToken, { title, body, tags, coverImageUrl }) => {
    try {
        const headers = {'Authorization': `Bearer ${accessToken}`}
        const savedBlog = await axios.post(url, { title, body, tags, coverImageUrl }, {headers});
        return savedBlog.data;
    } catch(err) {
        console.log(err)
        throw new Error('Blog couldn\'t be saved')
    }
}

const updateBlog = async (accessToken, id, { title, body, tags, coverImageUrl }) => {
    try{
        const headers = {'Authorization': `Bearer ${accessToken}`}
        const updatedBlog = await axios.put(`${url}/${id}`, {
            title,
            body,
            tags,
            coverImageUrl,
        }, { headers });
        return updatedBlog.data;

    } catch(err) {
        console.log(err)
        throw new Error('Blog couldn\'t be updated')
    }
};

const deleteBlog = async (id) => {
    try {
        const deleteBlog = await axios.delete(`${url}/${id}`);
        return deleteBlog;
    } catch (err) {
        console.log("error");
        console.log(err);
    }
};

const getBlogById = async (id) => {
    try {
        const blog = await axios.get(`${url}/${id}`);
        return blog.data;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const getSearchBlogs = async (title, pageNumber) => {
    try {
        const blogs = await axios.get(`${url}/search/${pageNumber}?q=${title}`);
        return blogs.data;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const getBlogsByTags = async (tag, pageNumber) => {
    try {
        const blogs = await axios.get(`${url}/tag/${tag}/${pageNumber}`);
        return blogs.data;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const getBlogTitles = async (title) => {
    if (title.length > 0) {
        try {
            const blogDetails = await axios.get(`${url}/live/${title}`);
            return blogDetails.data;
        } catch (err) {
            console.log(err);
            return null;
        }
    }
};

const likeBlog = async (accessToken, id) => {
    try {
        const headers = {'Authorization': `Bearer ${accessToken}`}
        const response = axios.put(`${url}/${id}/like`, {}, {headers})

        return response
    } catch (err) {
        console.log(err)
        throw new Error('Couldn\'t like the blog')
    }
}

const unlikeBlog = async (accessToken, id) => {
    try {
        const headers = {'Authorization': `Bearer ${accessToken}`}
        const response = axios.put(`${url}/${id}/unlike`, {}, {headers})

        return response
    } catch (err) {
        console.log(err)
        throw new Error('Couldn\'t unlike the blog')
    }
}

export {
    saveBlog,
    updateBlog,
    deleteBlog,
    getAllBlogs,
    getBlogById,
    getBlogsByTags,
    getSearchBlogs,
    getBlogTitles,
    likeBlog,
    unlikeBlog
};
