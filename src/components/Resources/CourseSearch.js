import React, { useEffect, useState } from 'react'
import { Card, Container, Row} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { getAllCourses } from '../../services/resourceService';

const CourseSearch = () => {

    const [results, setResults] = useState([])
    const [search, setSearch] = useState("");
    const [courses, setCourses] = useState("");

    useEffect(async () => {
        const courses = await getAllCourses();
        
        if(courses)
            setCourses(courses)
    }, [])

    const handleChange = (query) => {
        setSearch(query);
        
        if(query!=="") {
            const result = []
            courses.map((item) => {
                if(((item.code).toLowerCase()).includes((query).toLowerCase()) || ((item.name).toLowerCase()).includes((query).toLowerCase())) {
                    result.push(item)
                }
            })
            setResults(result)
        }
        else {
            setResults([])
        }
    }

    return (
        <div className="course-search">
            <Container className="padding">
                <Row className="outer-row">
                    <div className="col-12" style={{textAlign: "center"}}>
                        <h2 className="mt-5 text-white">Search your Course</h2>
                    </div>
                    <div className="col-12">
                        <div className="m-4 inner-row p-5">
                            <Row>
                                <div className="form-group col-md-12" style={{textAlign: "center"}}>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        id="ccode" 
                                        placeholder="Enter Course"
                                        value={search}
                                        onChange = {(e) => handleChange(e.target.value)}
                                        required 
                                    />
                                    
                                    {results.length!==0
                                        ? 
                                        <Card>
                                            {results.map((item, index) => {
                                                return (
                                                    <Link to={`/resourcehub/course/${item._id}`} key={index}>
                                                        <div className="py-1">{item.code} - {item.name}</div>
                                                    </Link>
                                                )
                                            })}
                                        </Card>
                                        : <div></div> 
                                    }
                                </div>
                            </Row>
                        </div>
                    </div>
                </Row>
                
            </Container>
        </div>
    )
}

export default CourseSearch
