import React, { useEffect, useState } from 'react'
import CourseTile from './CourseTile'
import { getAllCourses } from '../../services/resourceService'
import { Link } from 'react-router-dom'


const Courses = () => {
    const [courses, setcourses] = useState(null)
    const [loaded, setLoaded] = useState(false)
    let { branchId } = useParams();
    useEffect(async () => {
        const courses = await getAllCourses(branchId)
        setLoaded(true)
        if(courses)
        setcourses(courses)
    }, [])

    if(!loaded){
        return (
            <h1>Loading....</h1>
        )
    }

    return (
        <div>
            <h1>Courses</h1>
            <Link to='/courses/new'>
                <button>Create New Course</button>
            </Link>
            {courses ? courses.map(c => <CourseTile key={c._id} details={c} />) : <p>No courses to display</p>}
        </div>
    )
}

export default Courses