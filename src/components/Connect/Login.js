import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import "./login.css";
import { Redirect } from 'react-router-dom';
import { authLogin } from '../../services/connectService';
import { Link } from "react-router-dom"

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginstate, setLogin] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [userId, setUserId] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [forgotpass,setForgotPass] = useState(false);

    const validateForm = () => {
        if (username.length <= 0) {
            setShowToast(true);
            setToastMessage("Username should be more than 1 character");
            return false;
        }
        if (password.length < 8) {
            setShowToast(true);
            setToastMessage("Password must be of at least 8 characters");
            return false;
        }
        return username.length > 0 && password.length >= 8;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return false;
        }
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const response = await authLogin({ username, password });
        if (response && typeof response !== 'string' && response.accessToken) {
            let token = localStorage.getItem('accessToken');
            if (!token) {
                localStorage.setItem("accessToken", response.accessToken);
                localStorage.setItem('secondaryToken', '');
                localStorage.setItem('UserId', response.userId);
                localStorage.setItem('secondaryUserId', '');
                localStorage.setItem('username', response.username);
                localStorage.setItem('secondaryUsername', '');
                localStorage.setItem('type', response.anonymous ? 1 : 2);
                localStorage.setItem('secType', '');
            }
            else {
                let tmp1 = localStorage.getItem('accessToken').toString();
                let tmp2 = localStorage.getItem('UserId');
                let tmp3 = localStorage.getItem('username');
                let tmp4 = localStorage.getItem('type');
                localStorage.setItem('secondaryUserId', tmp2);
                localStorage.setItem('UserId', response.userId);
                localStorage.setItem('secondaryToken', tmp1);
                localStorage.setItem('accessToken', response.accessToken);
                localStorage.setItem('username', response.username);
                localStorage.setItem('secondaryUsername', tmp3);
                localStorage.setItem('type', response.anonymous ? 1 : 2);
                localStorage.setItem('secType', tmp4);
            }
            localStorage.setItem('UserId', response.userId);
            localStorage.setItem('upNav', '1');
            setUserId(response.userId);
            setLogin(true);
        } else {
            setShowToast(true);
            setToastMessage(response);
        }
    }

    if(forgotpass)
    {
        return <Redirect to={{
            pathname: '/connect/forgotpassword'
        }}
        />
    }

    if (loginstate) {
        return <Redirect to={{
            pathname: '/connect/profile'
        }}
        />
    }
    else {
        return (
            <div className="Login">
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={2000} autohide>
                    <Toast.Header>
                        <strong className="mr-auto">Incorrect details</strong>
                    </Toast.Header>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
                <h1 style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>Login Form</h1><br />
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username">
                        <div className="col-sm-6 col-md-6 col-lg-6 mx-auto">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                autoFocus
                                type="username"
                                value={username}
                                placeholder="Enter your username/email"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="password">
                        <div className="col-sm-6 col-md-6 col-lg-6 mx-auto">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </Form.Group>
                    <br />
                    <div className="col-sm-3 col-md-3 col-lg-3 mx-auto">
                        <Button block type="submit">
                            Login
                        </Button>
                    </div>
                    <br />
                    <div className="col-sm-3 col-md-3 col-lg-3 mx-auto">
                        <Link to='/connect/signup'><Button block type="submit">
                            Signup
                        </Button></Link>
                    </div>
                    <br />
                    <div className="col-sm-3 col-md-3 col-lg-3 mx-auto">
                        <Button block onClick={() => setForgotPass(true)}>
                            Forgot Password
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default Login