import React from 'react'
import { Container, Jumbotron } from 'react-bootstrap';
import Branches from './Branches'

const ResourceHome = () => {
    
    return (
        <div>
            <Jumbotron>
                <h1 className="p-5 display-4">Resource Module</h1>
            </Jumbotron>
            <Container>
                <Branches/>
            </Container>
        </div>
    )
}

export default ResourceHome;
