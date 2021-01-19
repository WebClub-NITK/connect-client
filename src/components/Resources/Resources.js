import React, { useEffect, useState } from 'react'
import CourseTile from './CourseTile'
import { getResourcesForCourse } from '../../services/resourceService'
import { Link } from 'react-router-dom'


const Resources = () => {
    const [resources, setresources] = useState(null)
    const [loaded, setLoaded] = useState(false)
    let { courseId } = useParams();
    useEffect(async () => {
        const resources = await getResourcesForCourse(courseId)
        setLoaded(true)
        if(resources)
        setresources(resources)
    }, [])

    if(!loaded){
        return (
            <h1>Loading....</h1>
        )
    }


    // return (
    //     <div>
    //         <h1>Resources</h1>
            
    //         {resources ? resources.map(r => <ResourceTile key={r._id} details={r} />) : <p>No resources to display</p>}
    //     </div>
    // )

    return (
        <h3>
            {resources.data}
        </h3>
        
        
        )
}

export default Resources