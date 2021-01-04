import React, {useState, useRef} from 'react'
import EditorJs from 'react-editor-js';
import {tools} from './editorConfig'
import {saveBlog} from '../../services/blogsService'
import {useHistory} from 'react-router-dom'

const NewBlog = () => {
    let history = useHistory();
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState('')

    const instanceRef = useRef(null)

    const getBody = async () => {
        const savedData = await instanceRef.current.save()
        return savedData
    }

    const handleClick = async () => {
        const title = document.getElementById('title').value
        const tags = document.getElementById('tags').value.split(',')
        const body = await getBody()
        const response = await saveBlog({title, body, tags})
        console.log(response)
        console.log(title, body)
        alert('blog saved')
        history.push(`/blogs/${response._id}`)
    }

    return (
        <div>
            <h1 style={{textAlign:'center'}}>Post a new Blog</h1>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <input id='title' placeholder='A catchy title' value={title} onChange={({target}) => setTitle(target.value)} style={{margin: 'auto', padding: '15px', fontSize: '2em', border: 0, textAlign: 'center', outlineWidth: 0}}></input>
                <input id='tags' placeholder='Tags, comma spaced values' value={tags} onChange={({target}) => setTags(target.value)} style={{margin: 'auto', padding: '10px', border: 0, textAlign: 'center', outlineWidth: 0}}></input>
                <EditorJs
                    instanceRef={(instance) => (instanceRef.current = instance)}
                    tools={tools}
                    placeholder='Share something interesting!'
                    logLevel='WARN'
                />
                <button onClick={handleClick} style={{padding: '10px', background: 'none', width: '150px', margin: 'auto'}}>Post</button>
            </div>
        </div>
    )
}

export default NewBlog




