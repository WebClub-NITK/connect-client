import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { likeBlog, unlikeBlog } from '../../services/blogsService';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';

const LikeButton = (props) => {

    const userId = localStorage.getItem('UserId')

    const accessToken = localStorage.getItem('accessToken')

    const [liked, setLiked] = useState(props.likes.includes(userId))
    const [likes, setLikes] = useState(props.likes.length)
    const [disable, setDisable] = useState(false)

    const handleLike = async () => {
        if(!userId) {
            alert('Please login')
            return
        }

        try{
            setDisable(true)
            if(!liked) {
                await likeBlog(accessToken, props.blogId)
                setLikes(likes + 1)
            } else {
                await unlikeBlog(accessToken, props.blogId)
                setLikes(likes - 1)
            }
            setLiked(!liked)
            setDisable(false)
        } catch(err) {
            console.log(err)
            alert('Some Error Occured')
        }
    }

    return (
        <>
            <button style={{background: 'none', border: '0px'}} disabled={disable} onClick={handleLike}>{liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}</button> {likes}
        </>
    )

}

LikeButton.propTypes = {
    likes: PropTypes.array,
    blogId: PropTypes.node
}

export default LikeButton