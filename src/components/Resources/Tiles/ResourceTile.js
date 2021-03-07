import React from 'react'
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { SERVER_URL } from '../../../services/config';

const ResourceTile = ({details}) => {
    const url = `${SERVER_URL}/resource_module`
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

ResourceTile.propTypes = {
    details: PropTypes.node,
};

export default ResourceTile