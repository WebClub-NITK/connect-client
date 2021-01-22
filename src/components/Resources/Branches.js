import React, { useEffect, useState } from 'react'
import BranchTile from './BranchTile'
import { getAllBranches } from '../../services/resourceService'
import { Row } from 'react-bootstrap'


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
                {branches ? branches.map(b => <BranchTile key={b._id} details={b} />) : <p>No branches to display</p>} 
            </Row>
        </div>
    )
}

export default Branches