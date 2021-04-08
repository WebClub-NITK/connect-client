import React, { useEffect, useState } from 'react'
import BranchTile from './Tiles/BranchTile'
import { getAllBranches } from '../../services/resourceService'
import { Row } from 'react-bootstrap'
import LoadingComponent from '../Blogs/LoadingComponent'


const Branches = () => {
    const [branches, setBranches] = useState(null)

    useEffect(async () => {
        const branches = await getAllBranches()
        setBranches(branches)
    }, [])

    return (
        <div className="padding">
            <h2 className="mb-5">Departments</h2>
            <Row className="justify-content-center">
                {branches ? branches.map(b => <BranchTile key={b._id} details={b} />) : <LoadingComponent/>} 
            </Row>
        </div>
    )
}

export default Branches