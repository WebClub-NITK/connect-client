import React from 'react'

import {
  BrowserRouter as Router,
  Switch, Route,
} from "react-router-dom"
  
import Home from './Home'
import Blogs from './Blogs/Blogs'
import ResourceHub from './ResourceHub'
import UserProfile from './Connect/Profile'
import Login from './Connect/Login'
import Signup from './Connect/Signup'
import Search from './Connect/Search'

const Routes = () => {

    return (
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/blogs">
            <Blogs />
          </Route>
          <Route path="/resourcehub">
            <ResourceHub />
          </Route>
          <Route path="/profile"
              component={props => <UserProfile {...props} />}
          />
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <Route path="/search" exact>
            <Search />
          </Route>
        </Switch>
      </Router>   
    )
}

export default Routes