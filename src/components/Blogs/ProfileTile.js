import React from "react";
import { Row, Image, ListGroupItem, ListGroup, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Connect/img.css";
import profilepic from "../../assets/logo.png";
import { SERVER_URL } from "../../services/config";

const ProfileTile = ({ user, jsonInfo }) => {
    if (user) {
        console.log(user);
        let profileurl = `${SERVER_URL}/profiles/${user.Username}`;
        if (user.Profile) {
            return (
                <div style={{ marginTop: '1rem' }}>
                    <Card style={{ width: "36rem" }}>

                        <Card.Body>
                            <Row>
                                <Image height="50px" style={{ marginRight: '1rem' }} src={profileurl} roundedCircle />
                                <Card.Title>
                                    <span style={{ opacity: '0.5', fontSize: '1rem', margin: '0' }}>{user.Username}</span><br />
                                    {user.Profile.Name}
                                </Card.Title>
                            </Row>

                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>
                                {Object.keys(jsonInfo.ProgrammeType).find(
                                    (key) =>
                                        jsonInfo.ProgrammeType[key] ===
                                        user.Profile?.ProgrammeType?.toString()
                                )}
                            </ListGroupItem>
                            <ListGroupItem>
                                {user.Profile?.Semester?.toString()}{" "}
                                {Object.keys(jsonInfo.Branch).find(
                                    (key) =>
                                        jsonInfo.Branch[key] ===
                                        user.Profile?.Department?.toString()
                                )}
                            </ListGroupItem>
                            <ListGroupItem style={{ float: 'l' }}>
                                <Button variant="dark"><Link style={{ color: "white" }} to={`/blogs/profile/${user.Id}`}>Blogs</Link></Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </div>
            );
        } else {
            return (
                <div
                    style={{
                        width: "100vw",
                        marginTop: "8em",
                        marginRight: "4.8em",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Card style={{ width: "36rem" }}>
                        <img
                            src={profilepic}
                            alt={"profilepic"}
                            style={{ objectFit: "contain" }}
                        />
                        <Card.Body>
                            <Card.Title style={{ textAlign: "center", fontSize: "2.4em" }}>
                                {user.Username}
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </div>
            );
        }
    } else {
        return <h1>No user found!</h1>;
    }
};

export default ProfileTile;


{/* <img
                            src={profileurl}
                            alt={"profilepic"}
                            style={{ objectFit: "contain" }}
                            className="circular"
                        /> */}