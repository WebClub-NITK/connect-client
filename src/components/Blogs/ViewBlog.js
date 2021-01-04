import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { getBlogById } from '../../services/blogsService';
import EditorJs from 'react-editor-js';
import {tools} from './editorConfig'

const ViewBlog = () => {
    const [blog, setBlog] = useState(null)
    const [loaded, setLoaded] = useState(false)
    let { blogId } = useParams();

    useEffect(async () => {
        const blog = await getBlogById(blogId)
        setLoaded(true)
        if(blog){
            setBlog(blog)
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
        <div>
            <div style={{textAlign:'center'}}>
                <h1>{blog.title}</h1>
                <p>{blog.tags.map((tag, index) => <span key={index} style={{padding: '2px 5px', border: '1px solid black', borderRadius: '5px', fontSize: '0.8em', margin: '2px'}}>{tag}</span>)}</p>
                <p>Updated On: {Date(blog.updatedAt).slice(0,10).replace(/-/g,"")}</p>
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