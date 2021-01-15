import React from 'react'

import {
  BrowserRouter as Router,
  Switch, Route,
  useRouteMatch
} from "react-router-dom"

import Branches from './Branches'
import Courses from './Courses'
import Resources from './Resources'

const ResourceRouter = () => {

    let match = useRouteMatch();

    return (
      <Router>
        <Switch>
           <Route path={`${match.path}`}>
            <Branches />
          </Route>
          <Route path={`${match.path}/courses/:branchId`}>
            <Courses />
          </Route>
          <Route path={`${match.path}/resources/:courseId`}>
            <Resources />
          </Route>
        </Switch>
      </Router>   
    )
}

export default ResourceRouter