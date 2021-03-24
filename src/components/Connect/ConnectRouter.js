import React from "react";

import {
    HashRouter as Router,
    Switch,
    Route,
    useRouteMatch,
} from "react-router-dom";

import Login from './Login'
import Signup from './Signup'
import Search from './Search'
import Updatepass from './Updatepass'
import AnnoSignup from './AnnoSignup'
import Profile from './Profile'
import ForgotPassword from './Forgotpassword'

const ConnectRouter = () => {
    let match = useRouteMatch();
    return(
        <Router>
            <Switch>
                <Route path={`${match.path}/profile`}>
                    <Profile />
                </Route>
                <Route path={`${match.path}/login`}>
                    <Login />
                </Route>
                <Route path={`${match.path}/signup`}>
                    <Signup />
                </Route>
                <Route path={`${match.path}/search`}>
                    <Search />
                </Route>
                <Route path={`${match.path}/annoSignup`}>
                    <AnnoSignup />
                </Route>
                <Route path={`${match.path}/forgotpassword`}>
                    <ForgotPassword />
                </Route>
                <Route path={`${match.path}/updatepass/:token`}>
                    <Updatepass />
                </Route>
            </Switch>
        </Router>
    )
}

export default ConnectRouter;