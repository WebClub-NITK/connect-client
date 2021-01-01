import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.css";
import { Redirect } from 'react-router-dom';

const Login = ()  => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginstate, setLogin] = useState(false);

  const validateForm = ()  => {
    return username.length > 0 && password.length > 0;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLogin(true);
  }

  if(loginstate) 
  {
    return <Redirect to="/profile" />
  }
  else
  {
    return (
      <div className="Login">
        <h1 style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>Login Form</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <br/>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <br/>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login