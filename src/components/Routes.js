import React from "react";

import { Switch, Route } from "react-router-dom";

import Home from "./Home";

import BlogsRouter from "./Blogs/BlogsRouter";
import ResourceRouter from "./Resources/ResourceRouter";
import ConnectRouter from "./Connect/ConnectRouter";
import SearchPage from "./SearchPage";

const Routes = () => {
    return (
        <Switch>
            <Route path="/blogs">
                <BlogsRouter />
            </Route>
            <Route path="/resourcehub">
                <ResourceRouter />
            </Route>
            <Route path="/connect">
                <ConnectRouter />
            </Route>
            <Route path="/search">
                <SearchPage />
            </Route>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
    );
};

export default Routes;
