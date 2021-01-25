import React, { useState, useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';
import { RetreiveInfo, search } from '../../services/connectService';
import { Redirect } from 'react-router-dom';
import profilepic from "../../assets/logo.png"
import ProfileCard from "./ProfileCard";

const Profile = (props) => {
    if(!localStorage.getItem('UserId'))
    {
        return <Redirect to={{
            pathname: '/login'
        }}
        />
    }
    let userId = localStorage.getItem('UserId').toString();
    const [jsonInfo, setJsonInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(async () => {
        const query = { id: userId.toString() }
        const user = await search({ query });
        const jsonVal = await RetreiveInfo();
        setUser(user);
        setJsonInfo(jsonVal);
        setIsLoading(false);
    }, []);
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
        return (<ProfileCard user={user} jsonInfo={jsonInfo}/>);
    }
}

export default Profile;