import React from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

import profilepic from "../../assets/logo.png";

const ProfileCard = (props) => {
    const user = props.user;
    const jsonInfo = props.jsonInfo;
    if (user) {
        if (user.Profile) {
            return (
                <div style={{ width: '36rem', marginTop: '8em', marginRight: '4.8em', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Card style={{ width: '36rem' }}>
                        <img src={profilepic} alt={'profilepic'} style={{ objectFit: 'contain' }} />
                        <Card.Body>
                            <Card.Title style={{ textAlign: "center", fontSize: "2.4em" }}>{user.Username}</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>{Object.keys(jsonInfo.ProgrammeType).find(key => jsonInfo.ProgrammeType[key] === user.Profile?.ProgrammeType.toString())}</ListGroupItem>
                            <ListGroupItem>{Object.keys(jsonInfo.Branch).find(key => jsonInfo.Branch[key] === user.Profile?.Department.toString())}</ListGroupItem>
                            <ListGroupItem>{user.Profile?.Semester.toString()}</ListGroupItem>
                        </ListGroup>
                    </Card>
                </div>
            )
        } else {
            return (
                <div style={{ width: '100vw', marginTop: '8em', marginRight: '4.8em', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Card style={{ width: '36rem' }}>
                        <img src={profilepic} alt={'profilepic'} style={{ objectFit: 'contain' }} />
                        <Card.Body>
                            <Card.Title style={{ textAlign: "center", fontSize: "2.4em" }}>{user.Username}</Card.Title>
                        </Card.Body>
                    </Card>
                </div>
            )
        }
    } else {
        return (
            <h1>No user found!</h1>
        );
    }
}

export default ProfileCard;
