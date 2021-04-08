import React, { useEffect, useState } from "react";
import { Button, Card, Container, Jumbotron, Row, Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllBlogs } from "../services/blogsService";
import { SERVER_URL } from "../services/config";
import { getAllResources } from "../services/resourceService";
import LoadingComponent from "./Blogs/LoadingComponent";
import NewBlogTile from "./Blogs/NewBlogTile";

const Home = () => {

    const [blogs, setBlogs] = useState(null)
    const [resources, setResources] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [blogs_order, setBlogsOrder] = useState('recent')

    useEffect(() => {
        
        setTimeout(async () => {
            const resource_data = await getAllResources()
            const blogs_data = await getAllBlogs()

            console.log(resource_data)

            blogs_data.blogs.reverse()

            setResources(resource_data)
            setBlogs(blogs_data.blogs)

            setLoaded(true)
        }, 300);
        
    }, [])

    const changeBlogsOrder = (order) => {

        const blogs_data = blogs;

        if(order==='recent') {
            blogs_data.sort(function(a,b){
                    return new Date(a.createdAt).getTime() - 
                    new Date(b.createdAt).getTime();
                }
            );
            blogs_data.reverse()
        }
        else if (order==='most-viewed') {
            blogs_data.sort(function(a,b){
                    return a.views - b.views;
                }
            );
            blogs_data.reverse()
        } 
        else if(order==='most-liked') {
            blogs_data.sort(function(a, b) {
                return a.likes.length - b.likes.length;
            })
            blogs_data.reverse()
        }

        setBlogs(blogs_data)
        setBlogsOrder(order)
    }

    if(!loaded) {
        return (
            <LoadingComponent/>
        )
    }

    const url = `${SERVER_URL}/resource_module`

    return (
        <div className="homepage">
            <Jumbotron>
                <Container>
                    <h1 class="display-1">Connect NITK</h1>
                    <p><Link to="/blogs"><Button>Blogs</Button></Link></p>
                    <p><Link to="/resourcehub"><Button>Resource Hub</Button></Link></p>
                </Container>
            </Jumbotron>

            <div className="even-section text-center popular-resources">
                <h1 className="py-5 mb-5">Popular Resources</h1>
                <Container>
                    <Row className="justify-content-center">
                        {resources.slice(0, 5).map((item) =>
                            <div className="col-12 col-sm-6 col-md-4">
                                <Card className="my-4">
                                    <Card.Header>
                                        <h4>{item.title}</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <div className="mb-3">{item.description}</div>
                                        <div className="user">Uploaded By: <strong>{item.user.Username}</strong></div>
                                        <Button className="mt-4" href={`${url}/docs/${item.files[0]}`}>Download</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        )}
                    </Row>
                </Container>
            </div>

            <div className="odd-section popular-blogs">
                <div className="text-center">
                    <h1 className="py-5 mb-5">Popular Blogs</h1>   
                </div> 
                <Container>
                    <Tabs 
                        id="controlled-tab-example"
                        activeKey={blogs_order}
                        onSelect={(k) => changeBlogsOrder(k)}
                    >
                        <Tab eventKey="recent" title="Recent">
                            {blogs.slice(0, 5).map((blog) => {
                                return (
                                    <div>
                                        <NewBlogTile
                                        key={blog._id}
                                        details={blog}
                                        description={JSON.parse(blog.body).blocks}
                                        />
                                    </div>
                                )
                            })}
                        </Tab>
                        <Tab eventKey="most-viewed" title="Most Viewed">
                            {blogs.slice(0, 5).map((blog) => {
                                return (
                                    <div>
                                        <NewBlogTile
                                        key={blog._id}
                                        details={blog}
                                        description={JSON.parse(blog.body).blocks}
                                        />
                                    </div>
                                )
                            })}
                        </Tab>
                        <Tab eventKey="most-liked" title="Most Liked">
                            {blogs.slice(0, 5).map((blog) => {
                                return (
                                    <div>
                                        <NewBlogTile
                                        key={blog._id}
                                        details={blog}
                                        description={JSON.parse(blog.body).blocks}
                                        />
                                    </div>
                                )
                            })}
                        </Tab>
                    </Tabs>
                </Container>
            </div>
        </div>
    );
};

export default Home;
