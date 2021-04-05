import axios from "axios";

import { SERVER_URL } from "./config";

const url = SERVER_URL + "/blogs";

const getAllBlogs = async (pageNumber) => {
    const blogsData = await axios.get(`${url}/page/${pageNumber}`);
    return blogsData.data;
};

const saveBlog = async (accessToken, { title, body, tags, coverImageUrl }) => {
    try {
        const headers = { 'Authorization': `Bearer ${accessToken}` }
        const savedBlog = await axios.post(url, { title, body, tags, coverImageUrl }, { headers });
        return savedBlog.data;
    } catch (err) {
        console.log(err)
        throw new Error('Blog couldn\'t be saved')
    }
}

const updateBlog = async (accessToken, id, { title, body, tags, coverImageUrl }) => {
    try {
        const headers = { 'Authorization': `Bearer ${accessToken}` }
        const updatedBlog = await axios.put(`${url}/${id}`, {
            title,
            body,
            tags,
            coverImageUrl,
        }, { headers });
        return updatedBlog.data;

    } catch (err) {
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
        const headers = { 'Authorization': `Bearer ${accessToken}` }
        const response = axios.put(`${url}/${id}/like`, {}, { headers })

        return response
    } catch (err) {
        console.log(err)
        throw new Error('Couldn\'t like the blog')
    }
}

const unlikeBlog = async (accessToken, id) => {
    try {
        const headers = { 'Authorization': `Bearer ${accessToken}` }
        const response = axios.put(`${url}/${id}/unlike`, {}, { headers })

        return response
    } catch (err) {
        console.log(err)
        throw new Error('Couldn\'t unlike the blog')
    }
}

const getUserBlogs = async (userId) => {
    try {
        const userBlogs = await axios.get(`${url}//profile/${userId}`);
        return userBlogs.data;
    } catch (e) {
        console.log(e);
        throw new Error('Couldn\'t get user blogs');
    }
}

//blog date
const getDateString = (date_string) => {
    let date = new Date(date_string);
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString("en-US", options);
}

const sanitiseText = (text) => {
    // remove html tags
    const regex_tag = /(<([^>]+)>)/ig
    text = text.replace(regex_tag, '')
    // remove character encodings, eg: &amp;
    const regex_encoding = /&([^\s]+)*;/g
    text = text.replace(regex_encoding, '')
    return text
}

const getDescription = (blocks) => {
    let description = ''
    for (const block of blocks) {
        if(description.length > 30){
            break
        }
        if(block.type == 'paragraph') {
            description += sanitiseText(block.data.text) + ' '
        } else if(block.type == 'header') {
            description += sanitiseText(block.data.text) + ' '
        } else if(block.type == 'list') {
            for (const item of block.data.items) {
                description += sanitiseText(item) + ' '
            }
        }
    }
    
    if(description.length > 100) {
        description = description.substring(0, 100)
        description += '...'
    }

    return description
}

const countMinutesToRead = (blocks) => {
    console.log('started calculating no of minutes')
    let seconds = 0
    let description = ''
    for (const block of blocks) {
        if(block.type == 'paragraph') {
            description += block.data.text
        } else if(block.type == 'header') {
            description += block.data.text
        } else if(block.type == 'list') {
            for (const item of block.data.items) {
                description += item
            }
        } else if(block.type == 'image') {
            seconds += 12
        }
    }

    const reading_speed = 22 // char per second (265 wpm)

    seconds += (description.length / reading_speed)

    const no_of_minutes = Math.floor(seconds / 60)



    return no_of_minutes > 1 ? no_of_minutes : 1

}

const bookmarkBlog = async (accessToken, id) => {
    try {
        const headers = { 'Authorization': `Bearer ${accessToken}` }
        const response = axios.put(`${url}/${id}/bookmark`, {}, { headers })

        return response
    } catch (err) {
        console.log(err)
        throw new Error('Couldn\'t bookmark the blog')
    }
}

const removeBookmarkBlog = async (accessToken, id) => {
    try {
        const headers = { 'Authorization': `Bearer ${accessToken}` }
        const response = axios.put(`${url}/${id}/removebookmark`, {}, { headers })

        return response
    } catch (err) {
        console.log(err)
        throw new Error('Couldn\'t remove this bookmark')
    }
}

const getBookmarkedBlogs = async (accessToken) => {
    try {
        const headers = { 'Authorization': `Bearer ${accessToken}` }
        const response = await axios.get(`${url}/bookmarks`, {headers})

        return response.data 
    } catch (err) {
        console.log(err)
        throw new Error('Something went wrong')
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
    unlikeBlog,
    getUserBlogs,
    getDateString,
    sanitiseText,
    getDescription,
    countMinutesToRead,
    bookmarkBlog,
    removeBookmarkBlog,
    getBookmarkedBlogs
};
