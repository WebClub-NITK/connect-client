import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from '../assets/logo.png';
import { LinkContainer } from "react-router-bootstrap";

const MainNavbar = () => {
    return (
        <Navbar style={{ color: "white" }} bg="dark" variant="dark" expand="lg">

            <Navbar.Brand as={Link} to="/">
                <img
                    alt=""
                    src={Logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />
                Connect
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to="/blogs">
                        <Nav.Link>Blogs</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/resourcehub">
                        <Nav.Link>Resource Hub</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/profile">
                        <Nav.Link>Profile</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/search">
                        <Nav.Link>Search</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MainNavbar;
