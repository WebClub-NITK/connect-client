import React, { useEffect, useState } from 'react'
import ResourceTile from './Tiles/ResourceTile'
import { createNewResource, getCourse, getResourcesForCourse } from '../../services/resourceService'
import { useParams } from 'react-router-dom'
import { Button, Card, Container, Form, InputGroup, Jumbotron, Row } from 'react-bootstrap'


const Resources = () => {
    const [resources, setResources] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [course, setCourse] = useState(null)

    const [newResourceTitle, setNewResourceTitle] = useState("")
    const [newResourceDescription, setNewResourceDescription] = useState("")
    const [file, setFile] = useState(null)
    const [filename, setFilename] = useState('Choose File')
    
    let { courseId } = useParams();
    
    useEffect(async () => {
        const resources = await getResourcesForCourse(courseId)
        const course = await getCourse(courseId)
        
        if(course)
            setCourse(course)
    
        if(resources)
            setResources(resources)

        setLoaded(true)
    }, [courseId])

    const handleSubmit = async () => {
        
        setLoaded(false)
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', newResourceTitle);
        formData.append('description', newResourceDescription);

        console.log(formData);

        const response = await createNewResource(courseId, formData)

        const resources = await getResourcesForCourse(courseId)
        
        if(resources)
            setResources(resources)
        
        setNewResourceTitle("")
        setNewResourceDescription("")
        setFilename("Choose File")
        setFile(null)
        setLoaded(true)
        alert(response)
    }


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }


    if(!loaded){
        return (
            <div className="loader-container">
                <div className="loader mt-5"></div>
            </div>
        )
    }

    return (
        <div>
            <Jumbotron>
                <h1 className="p-5 display-4">{course.name}</h1>
            </Jumbotron>
            <Container>
                <div className="padding"> 
                {resources.length!=0 
                    ?   
                        <>
                            <h2 className="mb-5">Available Resources</h2> 
                            <Row className="justify-content-center">
                                {resources.map(c => {
                                    return (
                                        <ResourceTile key={c._id} details={c} />
                                    )
                                })}
                            </Row>
                        </>
                        
                    : 
                        <h2 className="mb-5">Unfortunately No Resources Available for this Course</h2>
                }

                </div>

                <div className="padding">
                    <Row className="justify-content-center">
                        <div className="col-md-6">
                            <Card className="form-card">
                                <div className="card-header bg-dark text-white">
                                    <h2>Add a New Resource</h2>
                                </div>
                                <div className="card-body">
                                    <Form.Group>
                                        <Form.Label>Resource Title</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter Resource Title"
                                            value={newResourceTitle}
                                            onChange={(e)=>setNewResourceTitle(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Resource Description</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter Resource Description" 
                                            value={newResourceDescription}
                                            onChange={(e)=>setNewResourceDescription(e.target.value)}
                                        />
                                    </Form.Group>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Upload</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" id="inputGroupFile01" onChange={handleFileChange}/>
                                            <label className="custom-file-label" htmlFor="inputGroupFile01">{filename}</label>
                                        </div>
                                    </InputGroup>
                                    <Form.Group>
                                        <Button 
                                            className="btn-dark"
                                            onClick={handleSubmit}
                                        >
                                            Add Resource
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

export default Resources