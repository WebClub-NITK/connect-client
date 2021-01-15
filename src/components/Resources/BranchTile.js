import React from 'react'
import {Link, useRouteMatch} from 'react-router-dom'
import styles from './Styles'

const BranchTile = ({details}) => {
    let match = useRouteMatch();
    return (
        <div style={styles.BranchTile}>
            <h2>
                <Link to={`${match.path}/${details.code}`}>{details.name}</Link>
            </h2>    
        </div>
    )
}

export default BranchTile