import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.css";
import { Redirect } from 'react-router-dom';
import { signup } from '../../services/connectService';

const baseUrl = "http://localhost:3001/connect";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [signupstate, setSignup] = useState(false);
  let selectedfile = null

  const validateForm = () => {
    var regex = new RegExp('.*\@nitk.edu.in$');
    return username.length > 0 && password.length >= 8 && password === repassword && email.length > 0 && email.match(regex);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData()
    formData.append('profile',selectedfile)
    let options = {
        method: "post",
        body: formData,
    }
    await fetch(`${baseUrl}/upload_profilepic/${username}`,options)
    const response = await signup({ username, password, email });
    if (response) {
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('UserId', response.userId);
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
          <Form.Group controlId="email">
            <div className="col-sm-6 col-md-6 col-lg-6 mx-auto">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </Form.Group>
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
          <Form.Group controlId="selectedfile">
          <div className="col-sm-6 col-md-6 col-lg-6 mx-auto">
            <input type="file" onChange={(e) => {selectedfile = e.target.files[0];  }} />
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

export default Signup