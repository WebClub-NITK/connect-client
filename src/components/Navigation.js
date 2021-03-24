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
            <Link style={padding} to='/resourcehub'>Resource Hub</Link>
            <Link style={padding} to='/blogs'>Blogs</Link>
            <Link style={padding} to='/connect/login'>Login</Link>
            <Link style={padding} to='/connect/signup'>Signup</Link>
            <Link style={padding} to='/connect/search'>Search</Link>
            <Link style={padding} to='/connect/profile'>Profile</Link>
        </div>
    )
}

export default Nav