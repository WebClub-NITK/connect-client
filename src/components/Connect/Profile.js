import React, { useEffect } from "react";
import profilepic from "../../assets/logo.png"

const Profile = (props) => {
    let username = "ABCD";
    if(props.location.props)
        username = props.location.props.name;
    return (
        <div style={{width: '100vw', marginTop: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <img src={profilepic} alt={'profilepic'} style={{objectFit: 'contain'}} />
            <h1>{username}</h1>
        </div>
    )
}

export default Profile;