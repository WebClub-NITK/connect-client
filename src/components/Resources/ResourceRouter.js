import React from 'react'

import {
    HashRouter as Router,
    Switch, Route,
    useRouteMatch
} from "react-router-dom"

import Courses from './Courses'
import ResourceHome from './ResourceHome'
import Resources from './Resources'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/resources.css"

const ResourceRouter = () => {

    let match = useRouteMatch();

    return (
        <Router>
            <Switch>
                <Route exact path={`${match.path}`}>
                    <ResourceHome/>
                </Route>
                <Route path={`${match.path}/branch/:branchId`}>
                    <Courses />
                </Route>
                <Route path={`${match.path}/course/:courseId`}>
                    <Resources />
                </Route>
            </Switch>
        </Router>   
    )
}

export default ResourceRouter