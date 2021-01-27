import React from 'react'
import { Container, Jumbotron, Row } from 'react-bootstrap';
import Branches from './Branches'
import CourseSearch from './CourseSearch';

const ResourceHome = () => {
    
    return (
        <div>
            <Jumbotron>
                <h1 className="p-5 display-4">Resource Module</h1>
            </Jumbotron>
            <Container>
                <Branches/>
            </Container>
            <CourseSearch/>
        </div>
    )
}

export default ResourceHome;
