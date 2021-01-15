import React, { useEffect, useState } from 'react'
import CourseTile from './CourseTile'
import { createNewCourse, getAllBranches, getAllCourses } from '../../services/resourceService'
import { useParams } from 'react-router-dom'
import { Button, Card, Container, Form, Jumbotron, Row } from 'react-bootstrap'


const Courses = () => {
    const [courses, setCourses] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [branch, setBranch] = useState(null)

    const [newCourseCode, setNewCourseCode] = useState("")
    const [newCourseName, setNewCourseName] = useState("")
    
    let { branchId } = useParams();
    
    useEffect(async () => {
        const courses = await getAllCourses(branchId)
        const allBranches = await getAllBranches()

        allBranches.map((item) => {
            if(item._id === branchId) {
                setBranch(item)
            }
        })
        
        if(courses)
        setCourses(courses)

        setLoaded(true)
    }, [])

    const handleSubmit = async () => {
        const response =  await createNewCourse(newCourseCode, newCourseName, branchId)
        alert(response)
        setNewCourseCode("")
        setNewCourseName("")
    }

    if(!loaded){
        return (
            <h1>Loading....</h1>
        )
    }

    return (
        <div>
            <Jumbotron>
                <h1 className="p-5 display-4">{branch.name}</h1>
            </Jumbotron>
            <Container>
                <div className="padding">
                    <h2 className="mb-5">Available Courses</h2>
                    
                    <Row className="justify-content-center">
                        {courses ? courses.map(c => <CourseTile key={c._id} details={c} />) : <p>No courses to display</p>}
                    </Row>
                </div>

                <div className="padding">
                    <Row className="justify-content-center">
                        <div className="col-md-6">
                            <Card className="form-card">
                                <div className="card-header bg-dark text-white">
                                    <h2>Add a New Course</h2>
                                </div>
                                <div className="card-body">
                                    <Form.Group>
                                        <Form.Label>Course Code</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter Course Code"
                                            value={newCourseCode}
                                            onChange={(e)=>setNewCourseCode(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Course Name</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter Course Name" 
                                            value={newCourseName}
                                            onChange={(e)=>setNewCourseName(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button 
                                            className="btn-dark"
                                            onClick={handleSubmit}
                                        >
                                            Add Course
                                        </Button>
                                    </Form.Group>
                                </div>
                            </Card>
                        </div>
                    </Row>
                </div>
            </Container>
        </div>
    )
}

export default Courses