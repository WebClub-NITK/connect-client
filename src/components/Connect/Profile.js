import React, { useState, useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';
import { RetreiveInfo, search, updateProfile } from '../../services/connectService';
import { Redirect, useHistory } from 'react-router-dom';
import ProfileCard from "./ProfileCard";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Profile = () => {
    let history = useHistory();
    if (!localStorage.getItem('UserId')) {
        return <Redirect to={{
            pathname: '/login'
        }}
        />
    }
    let userId = localStorage.getItem('UserId').toString();
    const [jsonInfo, setJsonInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [ProgrammeType, setProgrammeType] = useState("");
    const [Branch, setBranch] = useState("");
    const [Semester, setSemester] = useState("");
    const [profileId, setProfileId] = useState("");
    const [updated, setUpdated] = useState(false);

    useEffect(async () => {
        console.log("Use");
        const query = { id: userId.toString() }
        const user = await search({ query });
        const jsonVal = await RetreiveInfo();
        setUser(user);
        setJsonInfo(jsonVal);
        if (user.Profile) {
            setProfileId(user.Profile.Id.toString());
            setEmail(user.Profile.Email);
            setName(user.Profile.Name);
            setProgrammeType(user.Profile?.ProgrammeType?.toString());
            setBranch(user.Profile?.Department?.toString());
            setSemester(user.Profile.Semester?.toString());
        }
        setIsLoading(false);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const name = document.getElementById("name").value;
        const ptype = document.getElementById("programmeType").value;
        const branch = document.getElementById("branch").value;
        const semester = document.getElementById("semester").value;
        const response = await updateProfile({ profileId, email, name, ptype, branch, semester });
        if (response.status === 200) {
            window.location.reload();
        }
    }
    if (isLoading) {
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
    } else {
        if (user.Profile) {
            return (
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <ProfileCard user={user} jsonInfo={jsonInfo} />
                    <Form onSubmit={handleSubmit} style={{marginTop: '8em', marginRight: '4.8em'}}>
                        <Form.Group controlId="email">
                            <div className="col-sm-12 col-md-12 col-lg-12 mx-auto">
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
                        <Form.Group controlId="name">
                            <div className="col-sm-12 col-md-12 col-lg-12 mx-auto">
                                <Form.Label>Name</Form.Label>
                                <Form.Control autoFocus type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                        </Form.Group>
                        <br />
                        <Form.Group controlId="programmeType">
                            <div className="col-sm-12 col-md-12 col-lg-12 mx-auto">
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
                        <br />
                        <Form.Group controlId="branch">
                            <div className="col-sm-12 col-md-12 col-lg-12 mx-auto">
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
                        <br />
                        <Form.Group controlId="semester">
                            <div className="col-sm-12 col-md-12 col-lg-12 mx-auto">
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
                        <br />
                        <Button block className="col-sm-12 col-md-12 col-lg-12 mx-auto" type="submit">
                            Update Profile
                        </Button>
                    </Form>
                </div>
            );
        } else {
            return (
                <ProfileCard user={user} jsonInfo={jsonInfo} />
            );
        }
    }
}

export default Profile;