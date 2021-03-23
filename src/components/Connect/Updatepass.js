import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import {updatepass} from "../../services/connectService"

const Updatepass = () => {
    let { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const validateForm  = () => {
        if (password.length < 8) {
            setShowToast(true);
            setToastMessage("Password must be of at least 8 characters");
            return false;
        }
        if (password !== confirmpassword) {
            setShowToast(true);
            setToastMessage("Passwords do not match");
            return false;
        }
        return true;
    }
    const handleSubmit = () => {
        updatepass(password,token);
    }
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
            }}>Password Reset Form</h1><br />
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <div className="col-sm-6 col-md-6 col-lg-6 mx-auto">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            autoFocus
                            type="password"
                            value={password}
                            placeholder="Enter your new password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </Form.Group>
                <br />
                <Form.Group controlId="password">
                    <div className="col-sm-6 col-md-6 col-lg-6 mx-auto">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmpassword}
                            placeholder="Confirm your password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </Form.Group>
                <br />
                <div className="col-sm-3 col-md-3 col-lg-3 mx-auto">
                    <Button block type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default Updatepass;