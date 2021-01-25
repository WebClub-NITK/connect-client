import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.css";
import { Redirect } from 'react-router-dom';
import { authLogin } from '../../services/connectService';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginstate, setLogin] = useState(false);
  const [userId, setUserId] = useState("");

  const validateForm = () => {
    return username.length > 0 && password.length >= 8;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const response = await authLogin({username, password});
    if (response && response.accessToken) {
      let token = localStorage.getItem('accessToken')
      console.log(!token)
      if(!token)
      {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem('secondaryToken', '');
        localStorage.setItem('UserId', response.userId)
        localStorage.setItem('secondaryUserId', '')
      }
      else
      {
        let tmp1 = localStorage.getItem('accessToken').toString()
        let tmp2 = localStorage.getItem('UserId', response.userId)
        localStorage.setItem('secondaryUserId', tmp2)
        localStorage.setItem('UserId', response.userId)
        localStorage.setItem('secondaryToken', tmp1)
        localStorage.setItem('accessToken', response.accessToken)
      }
      localStorage.setItem('UserId', response.userId)
      setUserId(response.userId);
      setLogin(true);
    }
  }

  if (loginstate) {
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
        }}>Login Form</h1><br/>
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
          <Button block type="submit" disabled={!validateForm()}>
            Login
          </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default Login