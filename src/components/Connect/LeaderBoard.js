import React, { useEffect, useState } from 'react'
import { leaderboard } from "../../services/connectService";
import Spinner from "react-bootstrap/Spinner";

const LeaderBoard = () => {

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
            <div className="container pt-5 mt-5">
                <table className="table table-dark">
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
                                <tr key={i}>
                                    <td scope="col">{i + 1}</td>
                                    <td scope="col">{user.Username}</td>
                                    <td scope="col">{user.Respect}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="100" style={{ textAlign: "center" }}>
                                    No users to display currently!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>           
            </div>
        )
    }
}

export default LeaderBoard
