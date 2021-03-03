import React from 'react'
import { Card } from 'react-bootstrap';

const ResourceTile = ({details}) => {
    const url = 'http://localhost:3001/resource_module'
    return (
        <div className="col-12 col-md-4">
            <a href={`${url}/docs/${details.files[0]}`}>
                <Card className="resource-tile">
                    <div className="card-body">
                        <h5 className="card-title">{ details.title }</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{details.description}</h6>
                    </div>
                </Card>
            </a>  
        </div>
    )
}

export default ResourceTile