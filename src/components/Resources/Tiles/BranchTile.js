import React from 'react'
import {Link, useRouteMatch} from 'react-router-dom'

const BranchTile = ({details}) => {
    let match = useRouteMatch();
    return (
        <div className="col-12 col-md-6">
            <div className="branch-tile p-3 m-3">
                <h4>
                    <Link to={`${match.path}/branch/${details._id}`} >{details.name}</Link>
                </h4> 
            </div>   
        </div>
    )
}

export default BranchTile