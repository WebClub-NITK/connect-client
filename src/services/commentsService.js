import axios from 'axios'
import { SERVER_URL } from './config';

const url = `${SERVER_URL}/comments`

const getAllComments = async (blogId) => {
    const blogComments = await axios.get(`${url}/blogs/${blogId}`);
    console.log(blogComments);
    if(blogComments.statusCode == 422)
    {
        return  blogComments.data.error;
    }
    else
    {
        return  blogComments.data.comments;
    } 
}

const addComment = async (comment, blogId) => {
    const commentStatus = await axios.post(`${url}/blogs/${blogId}`, {comment}, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
    })
    console.log(commentStatus);
    if(commentStatus == 422)
    {
        return commentStatus.data.error;   
    }
    else 
    {
        return commentStatus.data.message;
    }
}

const addReply = async (reply, commentId) => {
    const replyStatus = await  axios.put(`${url}/blogs/${commentId}`, {reply}, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
    })
    console.log(replyStatus);
    if(replyStatus == 422)
    {
        return replyStatus.data.error;
    }
    else
    {
        return replyStatus.data.message;
    }
}

export {
    getAllComments,
    addComment,
    addReply
}