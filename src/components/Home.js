import React, { useEffect, useState } from "react";
import { Button, Card, Container, Jumbotron, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllBlogs } from "../services/blogsService";
import { getAllResources } from "../services/resourceService";
import LoadingComponent from "./Blogs/LoadingComponent";

const Home = () => {

    const [blogs, setBlogs] = useState(null)
    const [resources, setResources] = useState(null)
    const [loaded, setLoaded] = useState(false)

    useEffect(async () => {
        const resource_data = await getAllResources()
        setResources(resource_data)

        const blogs = await getAllBlogs(1)
        setBlogs(blogs)

        // console.log(resources)

        setLoaded(true)
    }, [])

    if(!loaded) {
        return (
            <LoadingComponent/>
        )
    }

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
                        {Array(5).fill(1).map((el, i) =>
                            <div className="col-12 col-sm-6 col-md-4">
                                <Card className="my-4">
                                    <Card.Header>
                                        <h4>Resource Name</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <div className="mb-3">Description</div>
                                        <div className="user">Uploaded By: <strong>Username</strong></div>
                                        <Button className="mt-4">Download</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        )}
                    </Row>
                </Container>
            </div>

            <div className="odd-section text-center popular-blogs">

            </div>
        </div>
    );
};

export default Home;
