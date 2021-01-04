import React from 'react'

import {
  BrowserRouter as Router,
  Switch, Route,
} from "react-router-dom"
  
import Home from './Home'
import BlogsRouter from './Blogs/BlogsRouter'
import ResourceHub from './ResourceHub'
import UserProfile from './UserProfile'

const Routes = () => {

    return (
      <Router>
        <Switch>
          <Route path="/blogs">
            <BlogsRouter />
          </Route>
          <Route path="/resourcehub">
            <ResourceHub />
          </Route>
          <Route path="/profile">
            <UserProfile />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>   
    )
}

export default Routes