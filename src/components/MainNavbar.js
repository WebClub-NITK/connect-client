import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from '../assets/logo.png';
import { LinkContainer } from "react-router-bootstrap";
import logout from "./Connect/Logout";
import Toggel from "./Connect/Toggel";

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
                <Nav className="mr-auto container-fluid">
                    <LinkContainer to="/blogs">
                        <Nav.Link>Blogs</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/resourcehub">
                        <Nav.Link>Resource Hub</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/connect/profile">
                        <Nav.Link>Profile</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/search">
                        <Nav.Link>Search</Nav.Link>
                    </LinkContainer>
                    <NavDropdown
                        className="ml-auto"
                        title="Menu"
                        id="dropdown-menu-align-right"
                        style={{ marginRight: "2em" }}
                    >
                        <NavDropdown.Item>{`${localStorage.getItem('type') === '1' ? 'Public' : localStorage.getItem('type') === '2' ? 'Anonymous' : 'Guest'} User`}</NavDropdown.Item>
                        <NavDropdown.Item href="#/connect/profile">Profile</NavDropdown.Item>
                        {(localStorage.getItem("secondaryToken") !== null && localStorage.getItem("secondaryToken") !== '') ? (
                            <NavDropdown.Item onClick={Toggel}>Toggle</NavDropdown.Item>) : (<NavDropdown.Item href="#/connect/login">Add Account</NavDropdown.Item>)}
                        <NavDropdown.Divider />
                        {localStorage.getItem("accessToken") !== null ? (
                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>) : (<NavDropdown.Item href="#/connect/login">Login</NavDropdown.Item>)}
                    </NavDropdown>
                    {localStorage.getItem('username') !== null && localStorage.getItem('username') !== '' ?
                        (<Navbar.Text>
                            Signed in as: {localStorage.getItem('username')}
                        </Navbar.Text>)
                        : (<LinkContainer to="/connect/login">
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>)}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MainNavbar;
