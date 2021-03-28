import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.css";
import Toast from "react-bootstrap/Toast";
import { Redirect } from 'react-router-dom';
import {forgotpass} from '../../services/connectService'

const ForgotPassword = () => {
    const [username,setUsername] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        await forgotpass({username})
        setShowToast(true);
        setToastMessage("Please check your email for Password rest link")
    }

    return(
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
            }}>Reset Password</h1><br />
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
                <div className="col-sm-3 col-md-3 col-lg-3 mx-auto">
                    <Button block type="submit">
                        Send Email
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default ForgotPassword;