import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import "./login.css";
import { Redirect } from 'react-router-dom';
import { signup } from '../../services/connectService';
import { SERVER_URL } from "../../services/config";
import GoogleLogin from 'react-google-login'

// const baseUrl = "http://localhost:3001/connect";
const baseUrl = `${SERVER_URL}/connect`

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [signupstate, setSignup] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const validateForm = () => {
        var regex = new RegExp('.*@nitk.edu.in$');
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
        if (password !== repassword) {
            setShowToast(true);
            setToastMessage("Confirmation of password is incorrect");
            return false;
        }
        if (email.length <= 0) {
            setShowToast(true);
            setToastMessage("Email should be more than 1 character");
            return false;
        }
        if (!email.match(regex)) {
            setShowToast(true);
            setToastMessage("Email should be of the form nitk.edu.in");
            return false;
        }
        return username.length > 0 && password.length >= 8 && password === repassword && email.length > 0 && email.match(regex);
    }

    const responsegoogle = (res) => {
        setEmail(res.profileObj.email);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return false;
        }
        const response = await signup({ username, password, email });
        if (response && typeof response !== 'string' && !(response instanceof Array)) {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('UserId', response.userId);
            localStorage.setItem('username', response.username);
            localStorage.setItem('type', response.anonymous ? 1 : 2);
            localStorage.setItem('upNav', '1');
            setSignup(true);
        } else {
            setShowToast(true);
            if (response instanceof Array) {
                response.forEach((e) => {
                    setToastMessage(e);
                });
            } else {
                setToastMessage(response);
            }
        }
    }

    if (signupstate) {
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
                }}>Sign Up</h1>
                <Form onSubmit={handleSubmit}>
                    <br />
                    <Form.Group controlId="username">
                        <div className="col-sm-6 col-md-6 col-lg-6 mx-auto">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                type="username"
                                value={username}
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
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="repassword">
                        <div className="col-sm-6 col-md-6 col-lg-6 mx-auto">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={repassword}
                                onChange={(e) => setRepassword(e.target.value)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <div className="col-sm-6 col-md-6 col-lg-6 mx-auto">
                        <Form.Label>Confirm Password</Form.Label>
                            <br />
                            <GoogleLogin
                                clientId="85087114323-nmfhkspttd354dcpunkrkonclm1vobit.apps.googleusercontent.com"
                                buttonText="Choose Email"
                                onSuccess={responsegoogle}
                                onFailure={responsegoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                    </Form.Group>
                    <br />
                    <Button block className="col-sm-6 col-md-6 col-lg-6 mx-auto" type="submit">
                        Signup
                    </Button>
                </Form>
            </div>
        );
    }
}

export default Signup