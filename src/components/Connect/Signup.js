import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.css";
import { Redirect } from 'react-router-dom';

const Signup = ()  => {
  const [username, setUsername] = useState("");
  const [annousername, setAnnousername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [signupstate, setSignup] = useState(false);

  const validateForm = ()  => {
    return username.length > 0 && password.length > 0 && password===repassword && email.length>0 && annousername.length>0;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSignup(true);
  }

  if(signupstate) 
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
          }}>Sign Up</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <br/>
          <Form.Group size="lg" controlId="username">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <br/>
          <Form.Group size="lg" controlId="annousername">
            <Form.Label>Anonymous User Name</Form.Label>
            <Form.Control
              type="username"
              value={annousername}
              onChange={(e) => setAnnousername(e.target.value)}
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
          <Form.Group size="lg" controlId="repassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
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

export default Signup