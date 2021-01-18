import React, { useEffect, useState } from 'react'
import {useParams, Link} from 'react-router-dom'
import { getBlogById } from '../../services/blogsService';
import EditorJs from 'react-editor-js';
import {tools} from './editorConfig'
import styles from './blogStyles'
import Confetti from 'react-dom-confetti';

const config = {
    angle: "270",
    spread: "180",
    startVelocity: "15",
    elementCount: "144",
    dragFriction: "0.05",
    duration: 2000,
    stagger: "0",
    width: "10px",
    height: "10px",
    perspective: "1000px",
    colors: ["#000", "#f00"]
  };

const ViewBlog = (props) => {
    const [blog, setBlog] = useState(null)
    const [loaded, setLoaded] = useState(false)
    let { blogId } = useParams();
    const [confeti, setConfeti] = useState(false)

    useEffect(async () => {
        const blog = await getBlogById(blogId)
        const params = new URLSearchParams(window.location.search);
        
        setLoaded(true)
        if(blog){
            setBlog(blog)
            if(params.get('new')) {
                history.pushState({}, null,'http://localhost:3000/blogs/5ff3330ce2c7f20c1408c36e')
                setTimeout(() => {
                    setConfeti(true)
                }, 1000);
            }
        }
    }, [])

    if(!loaded){
        return (
            <h1>Loading</h1>
        )
    }

    if(!blog){
        return(
            <h1>Not Found</h1>
        )
    }

    return (
        <div style={{overflowX: 'hidden'}}>
            <Confetti className='confeti' active={ confeti } config={ config }/>
            <div style={{textAlign:'center'}}>
                <h1>{blog.title}</h1>
                <img style={{maxWidth: '500px'}} src={blog.coverImageUrl}></img>
                <p>{blog.tags.map((tag, index) => <span key={index} style={styles.tag}>{tag}</span>)}</p>
                <p>Updated On: {Date(blog.updatedAt).slice(0,10).replace(/-/g,"")}</p>
                <button style={{padding: '5px 10px',color: 'gray', border: '1px solid gray', background: 'white', borderRadius: '2px'}} ><Link style={styles.link} to={`/blogs/${blogId}/update`}>Update</Link></button>
            </div>
            <EditorJs
                    tools={tools}
                    readOnly={true}
                    data={JSON.parse(blog.body)}
                    logLevel='ERROR'
            />
        </div>
    )
}

export default ViewBlog