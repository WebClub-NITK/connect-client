import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { bookmarkBlog, removeBookmarkBlog } from '../../services/blogsService';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

const BookmarkButton = (props) => {

    const userId = localStorage.getItem('UserId')

    const accessToken = localStorage.getItem('accessToken')

    const [bookmarked, setBookmarked] = useState(props.bookmarks.includes(userId))
    const [bookmarks, setBookmarks] = useState(props.bookmarks.length)
    const [disable, setDisable] = useState(false)

    const handleBookmark = async () => {
        if(!userId) {
            alert('Please login')
            return
        }

        try{
            setDisable(true)
            if(!bookmarked) {
                await bookmarkBlog(accessToken, props.blogId)
                setBookmarks(bookmarks + 1)
            } else {
                await removeBookmarkBlog(accessToken, props.blogId)
                setBookmarks(bookmarks - 1)
            }
            setBookmarked(!bookmarked)
            setDisable(false)
        } catch(err) {
            console.log(err)
            alert('Some Error Occured')
        }
    }

    return (
        <>
            <button style={{background: 'none', border: '0px'}} disabled={disable} onClick={handleBookmark}>{bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}</button>
        </>
    )

}

BookmarkButton.propTypes = {
    bookmarks: PropTypes.array,
    blogId: PropTypes.node
}

export default BookmarkButton