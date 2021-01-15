import React from 'react'

import {
  BrowserRouter as Router,
  Switch, Route,
} from "react-router-dom"
  
import Home from './Home'
import BlogsRouter from './Blogs/BlogsRouter'
import UserProfile from './UserProfile'
import ResourceRouter from './Resources/ResourceRouter'

const Routes = () => {

    return (
      <Router>
        <Switch>
          <Route path="/blogs">
            <BlogsRouter />
          </Route>
          <Route path="/resourcehub">
            <ResourceRouter/>
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