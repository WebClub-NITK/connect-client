import React from 'react'
import { Container, Jumbotron} from 'react-bootstrap';
import Branches from './Branches'
import CourseSearch from './CourseSearch';

const ResourceHome = () => {
    
    return (
        <div>
            <Jumbotron>
                <h1 className="p-5 display-4">Resource Module</h1>
            </Jumbotron>
            <div className="even-section">
                <Container>
                    <Branches/>
                </Container>
            </div>
            <div className="odd-section">
                <CourseSearch/>
            </div>
        </div>
    )
}

export default ResourceHome;
