import React, { useEffect, useState } from "react";
import { RetreiveInfo, search } from "../../services/connectService";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import ProfileCard from "./ProfileCard";
import Toast from "react-bootstrap/Toast";

const Search = () => {
    const [users, setUsers] = useState(null);
    const [query, setQuery] = useState("");
    const [jsonInfo, setJsonInfo] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    useEffect(async () => {
        const jsonVal = await RetreiveInfo();
        setJsonInfo(jsonVal);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        let val = document.getElementById("username").value;
        let query = { username: val };
        let users = await search({ query });
        if (users && typeof users === 'string') {
            setShowToast(true);
            setToastMessage(users);
        } else {
            setUsers(users);
        }
    }

    return (
        <div>
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
                }}>Search For Users</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username">
                        <div className="col-sm-6 col-md-6 col-lg-6 mx-auto">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                autoFocus
                                type="username"
                                value={query}
                                placeholder="Enter a username"
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <br />
                            <Button block className="col-sm-6 col-md-6 col-lg-6 mx-auto" type="submit">
                                Search
                            </Button>
                        </div>
                    </Form.Group>
                </Form>
            </div>
            <div className="row" style={{ justifyContent: "center" }}>
                {users ? (
                    users.map((user) => (
                        // eslint-disable-next-line react/jsx-key
                        <ProfileCard
                            user={user}
                            jsonInfo={jsonInfo}
                        />
                    ))
                ) : query === "" ? (<p>Search for a user!</p>) : (
                    <p>No users found!</p>
                )}
            </div>
        </div>
    );
}

export default Search;