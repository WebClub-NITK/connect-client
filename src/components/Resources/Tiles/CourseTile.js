import React from 'react'
import { Card } from 'react-bootstrap';
import {Link, useRouteMatch} from 'react-router-dom'

const CourseTile = ({details}) => {
    let match = useRouteMatch();
    return (
        <div className="col-12 col-md-4">
            <Link to={`/resourcehub/course/${details._id}`}>
                <Card className="course-tile">
                    <div className="card-body">
                        <h5 className="card-title">{ details.code }</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{details.name}</h6>
                    </div>
                </Card>
            </Link>  
        </div>
    )
}

export default CourseTile