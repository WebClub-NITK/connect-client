import React from 'react'
import { Link } from "react-router-dom"

const Nav = () => {

    const padding = {
        padding: 5,
        textDecoration: 'none'
    }
    
    return(
        <div>
            <Link style={padding} to='/'>Home</Link>
            <Link style={padding} to='/profile'>Profile</Link>
            <Link style={padding} to='/resourcehub'>Resource Hub</Link>
            <Link style={padding} to='/blogs'>Blogs</Link>
            <Link style={padding} to='/login'>Login</Link>
            <Link style={padding} to='/signup'>Signup</Link>
            <Link style={padding} to='/annoSignup'>Anonymous Signup</Link>
            <Link style={padding} to='/search'>Search</Link>
        </div>
    )
}

export default Nav