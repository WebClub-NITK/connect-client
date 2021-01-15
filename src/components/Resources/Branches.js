import React, { useEffect, useState } from 'react'
import BranchTile from './BranchTile'
import { getAllBranches } from '../../services/resourceService'
import { Link } from 'react-router-dom'


const Branches = () => {
    const [branches, setBranches] = useState(null)

    useEffect(async () => {
        const branches = await getAllBranches()
        setBranches(branches)
    }, [])

    return (
        <div>
            <h1>Branches</h1>
            
            {branches ? branches.forEach(b => <BranchTile key={b._id} details={b} />) : <p>No branches to display</p>}
        </div>
    )
}

export default Branches