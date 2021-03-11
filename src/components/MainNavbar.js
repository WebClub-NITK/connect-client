import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const MainNavbar = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav as={Link} to="/">
                        Home
                    </Nav>
                    <Nav as={Link} to="/blogs">
                        Blogs
                    </Nav>
                    <Nav as={Link} to="/resourcehub">
                        Resource Hub
                    </Nav>
                    <Nav as={Link} to="/profile">
                        Profile
                    </Nav>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MainNavbar;
