import React from 'react'

import {
    HashRouter as Router,
    Switch, Route,
} from "react-router-dom"
  
import Home from './Home'


import Login from './Connect/Login'
import Signup from './Connect/Signup'
import Search from './Connect/Search'

import BlogsRouter from './Blogs/BlogsRouter'
import ResourceRouter from './Resources/ResourceRouter'
import AnnoSignup from './Connect/AnnoSignup'
import Profile from './Connect/Profile'

const Routes = () => {

    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/blogs">
                    <BlogsRouter />
                </Route>
                <Route path="/resourcehub">
                    <ResourceRouter/>
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
            </Switch>
        </Router>   
    )
}

export default Routes