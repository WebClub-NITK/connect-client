import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import Logo from '../assets/logo.png';
import toggel from '../components/Connect/Toggel';
import logout from '../components/Connect/Logout';
import Spinner from 'react-bootstrap/Spinner';
import { leaderboard } from '../services/connectService';
import { Link } from 'react-router-dom';

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState(null);
    useEffect(async () => {
        const response = await leaderboard();
        setUsers(response);
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
        return (
            <div style={{ width: '100vw', marginTop: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={Logo} alt={'logo'} style={{ objectFit: 'contain' }} />
                <h1>Connect</h1>
                <Navigation />
                {localStorage.getItem("accessToken") !== null ? (
                    <div>
                        <button type="submit" onClick={toggel}>Toggel</button><br />
                        <button type="submit" onClick={logout}>Logout</button>
                    </div>
                ) : (<Link className="btn btn-primary" style={{marginTop: "1em"}} to='/login'>Login</Link>)}
                <div className="col-sm-12 col-md-12 col-xs-12" style={{ paddingTop: "4em", paddingLeft: "36em", paddingRight: "36em" }}>
                    <table class="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Username</th>
                                <th scope="col">Respect</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users ? (
                                users.map((user, i) => (
                                    <tr>
                                        <td scope="col">{i + 1}</td>
                                        <td scope="col">{user.Username}</td>
                                        <td scope="col">{user.Respect}</td>
                                    </tr>
                                ))
                            ) : (<tr><td colSpan="100" style={{ textAlign: "center" }}>No users to display currently!</td></tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Home
