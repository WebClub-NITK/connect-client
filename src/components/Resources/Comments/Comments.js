import React from 'react'
import Replies from './Replies'

const Comments = ({comment, resetComments}) => {
    return (
        <div>
            <div><strong>Username</strong></div>
            {comment.text}
            <Replies replies={comment.replies} commentId={comment._id} resetComments={resetComments} />
        </div>
    )
}

export default Comments
