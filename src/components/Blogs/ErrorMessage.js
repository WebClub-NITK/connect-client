import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({message, setMessage}) => {

    if(message === null) {
        return null
    }

    setTimeout(() => {
        setMessage(null)
    }, 4000)

    return(
        <h2>{message}</h2>
    )
}

ErrorMessage.propTypes = {
    message: PropTypes.node,
    setMessage: PropTypes.node
}

export default ErrorMessage