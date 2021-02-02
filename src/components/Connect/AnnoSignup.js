import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.css";
import { Redirect } from 'react-router-dom';
import { annoSignup } from '../../services/connectService';

const AnnoSignup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [signupstate, setSignup] = useState(false);

  const validateForm = () => {
    return username.length > 0 && password.length >= 8 && password === repassword;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const response = await annoSignup({ username, password });
    if (response === null) {
      return <Redirect to={{
        pathname: '/login'
      }}
      />
    }
    if (response) {
        localStorage.setItem('secondaryToken', response.accessToken);
        localStorage.setItem('secondaryUserId', response.userId);
        setSignup(true);
    }
  }

  if (signupstate) {
    return <Redirect to={{
      pathname: '/profile'
    }}
    />
  }
  else {
    return (
      <div className="Login">
        <h1 style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>Sign Up</h1>
        <Form onSubmit={handleSubmit}>
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
          <br />
          <Button block className="col-sm-6 col-md-6 col-lg-6 mx-auto" type="submit" disabled={!validateForm()}>
            Signup
          </Button>
        </Form>
      </div>
    );
  }
}

export default AnnoSignup