import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from 'react-bootstrap/Spinner';
import "./login.css";
import { Redirect } from 'react-router-dom';
import { signup, RetreiveInfo } from '../../services/connectService';

const Signup = ()  => {
  const [username, setUsername] = useState("");
  const [annousername, setAnnousername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [annoPassword, setAnnoPassword] = useState("");
  const [annoRepassword, setAnnoRepassword] = useState("");
  const [name, setName] = useState("");
  const [ProgrammeType, setProgrammeType] = useState("");
  const [Branch, setBranch] = useState("");
  const [Semester, setSemester] = useState("");
  const [signupstate, setSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [jsonInfo, setJsonInfo] = useState(null);
  const [userId, setUserId] = useState("");
  if (isLoading) {
    (async () => {
      if (isLoading) {
        const jsonVal = await RetreiveInfo();
        setJsonInfo(jsonVal);
        setIsLoading(false);
      }
    })();
  }

  const validateForm = ()  => {
    var regex = new RegExp('.*\@nitk.edu.in$');
    return username.length > 0 && password.length >= 8 && password === repassword && email.length > 0 && email.match(regex) && annousername.length > 0 && annoPassword.length >= 8 && annoRepassword === annoPassword;
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const annoPassword = document.getElementById("annoPassword").value;
    const annoUsername = document.getElementById("annousername").value;
    const name = document.getElementById("name").value;
    const ptype = document.getElementById("programmeType").value;
    const branch = document.getElementById("branch").value;
    const semester = document.getElementById("semester").value;
    const response = await signup({username, password, annoUsername, annoPassword, name, ptype, semester, branch, email});
    if (response) {
      localStorage.setItem('accessToken', response.accessToken);
      setUserId(response.userId.toString());
      setSignup(true);
    }
  }

  if (!isLoading) {
    if(signupstate) 
  {
    return <Redirect to={{
                  pathname: '/profile',
                  props: { userId: userId }
              }}
            />
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
          <br/>
          <Form.Group controlId="name">
            <div className="col-sm-6 col-md-6 col-lg-6 mx-auto">
              <Form.Label>Name</Form.Label>
              <Form.Control autoFocus type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
          </Form.Group>
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
          <br/>
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
          <br/>
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
          <br/>
          <Form.Group controlId="annousername">
          <div className="col-sm-6 col-md-6 col-lg-6 mx-auto">
          <Form.Label>Anonymous User Name</Form.Label>
            <Form.Control
              type="text"
              value={annousername}
              onChange={(e) => setAnnousername(e.target.value)}
            />
          </div>        
          </Form.Group>
          <br/>
          <Form.Group controlId="annoPassword">
          <div className="col-sm-6 col-md-6 col-lg-6 mx-auto">
          <Form.Label>Password for Anonymous Profile</Form.Label>
            <Form.Control
              type="password"
              value={annoPassword}
              onChange={(e) => setAnnoPassword(e.target.value)}
            />
          </div>
          </Form.Group>
          <br/>
          <Form.Group size="lg" controlId="annoRepassword">
          <div className="col-sm-6 col-md-6 col-lg-6 mx-auto">
          <Form.Label>Confirm Password for Anonymous Profile</Form.Label>
            <Form.Control
              type="password"
              value={annoRepassword}
              onChange={(e) => setAnnoRepassword(e.target.value)}
            />
          </div>
          </Form.Group>
          <br/>
          <Form.Group controlId="programmeType">
            <div className="col-sm-6 col-md-6 col-xs-6 mx-auto">
            <Form.Label>Select ProgrammeType</Form.Label>
            <Form.Control as="select" value={ProgrammeType} custom onChange={(e) => setProgrammeType(e.target.value)}>
              {Object.entries(jsonInfo.ProgrammeType).map((option) => 
              <option key={option[0]} value={option[1]}>
                {option[0]}
              </option>
              )}
            </Form.Control>
            </div>
          </Form.Group>
          <br/>
          <Form.Group controlId="branch">
            <div className="col-sm-6 col-md-6 col-xs-6 mx-auto">
            <Form.Label>Select Branch</Form.Label>
            <Form.Control as="select" custom value={Branch} onChange={(e) => setBranch(e.target.value)}>
              {Object.entries(jsonInfo.Branch).map((option) => 
              <option key={option[0]} value={option[1]}>
                {option[0]}
              </option>
              )}
            </Form.Control>
            </div>
          </Form.Group>
          <br/>
          <Form.Group controlId="semester">
            <div className="col-sm-6 col-md-6 col-xs-6 mx-auto">
            <Form.Label>Select Semester</Form.Label>
            <Form.Control as="select" custom value={Semester} onChange={(e) => setSemester(e.target.value)}>
              {Object.entries(jsonInfo.Semester).map((option) => 
              <option key={option[0]} value={option[1]}>
                {option[0]}
              </option>
              )}
            </Form.Control>
            </div>
          </Form.Group>
          <br/>
          <Button block className="col-sm-6 col-md-6 col-lg-6 mx-auto" type="submit" disabled={!validateForm()}>
            Signup
          </Button>
        </Form>
      </div>
    );
  }    
  } else {
    return (
      <div className="mx-auto my-auto">
       <Spinner
      as="span"
      animation="grow"
      size="lg"
      role="status"
      aria-hidden="true"
    />
      </div>
    );
  }
}

export default Signup