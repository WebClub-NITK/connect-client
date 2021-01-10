import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";

import Blogs from "./Blogs";
import NewBlog from "./NewBlog";
import SearchBlog from "./SearchBlog";
import Tags from "./Tags";
import ViewBlog from "./ViewBlog";
import UpdateBlog from "./UpdateBlog";

const BlogsRouter = () => {
  let match = useRouteMatch();

  return (
    <Router>
      <Switch>
        <Route path={`${match.path}/new`}>
          <NewBlog />
        </Route> 
        <Route path={`${match.path}/update/:blogId`}>
          <UpdateBlog />
        </Route> 
        <Route path={`${match.path}/title/:title`}>
          <SearchBlog />
        </Route>
        <Route path={`${match.path}/tag/:tag`}>
          <Tags/>
        </Route>
        <Route path={`${match.path}/:blogId`}>
          <ViewBlog />
        </Route>
        <Route path={match.path}>
          <Blogs />
        </Route>
      </Switch>
    </Router>
  );
};

export default BlogsRouter;
