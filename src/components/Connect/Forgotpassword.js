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
        <div className="container">
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
            <div className='form-wrap'>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <div className="form-wrap">
                        <Form.Label className='label'>Username</Form.Label>
                        <Form.Control
                            className='input'
                            autoFocus
                            type="username"
                            value={username}
                            placeholder="Enter your username/email"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </Form.Group>
                
                    <Button className='btn'block type="submit">
                        Send Email
                    </Button>
                
            </Form>
            </div>
        </div>
    )
}

export default ForgotPassword;