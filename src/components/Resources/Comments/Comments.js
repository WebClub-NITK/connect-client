import React from 'react'
import PropTypes from 'prop-types';
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

Comments.propTypes = {
    comment: PropTypes.node,
    resetComments: PropTypes.node,
};

export default Comments
