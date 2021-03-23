import React from 'react'

import {
    Switch, Route,
} from "react-router-dom"

import Home from './Home'


import Login from './Connect/Login'
import Signup from './Connect/Signup'
import Search from './Connect/Search'
import Updatepass from './Connect/Updatepass'

import BlogsRouter from './Blogs/BlogsRouter'
import ResourceRouter from './Resources/ResourceRouter'
import AnnoSignup from './Connect/AnnoSignup'
import Profile from './Connect/Profile'

const Routes = () => {

    return (

        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/blogs">
                <BlogsRouter />
            </Route>
            <Route path="/resourcehub">
                <ResourceRouter />
            </Route>
            <Route path="/profile">
                <Profile />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/signup" exact>
                <Signup />
            </Route>
            <Route path="/search" exact>
                <Search />
            </Route>
            <Route path="/annoSignup" exact>
                <AnnoSignup />
            </Route>
            <Route path="/updatepass/:token" exact>
                <Updatepass />
            </Route>
        </Switch>

    )
}

export default Routes