import React, {useState, useRef} from 'react'
import EditorJs from 'react-editor-js';
import {tools} from './editorConfig'

const NewBlog = () => {
    const [title, setTitle] = useState('')

    const instanceRef = useRef(null)

    const getBody = async () => {
        const savedData = await instanceRef.current.save()
        return savedData
    }

    const handleClick = async () => {
        const title = document.getElementById('title').value
        const body = await getBody()
        console.log(title, body)
        alert('blog saved')
    }

    return (
        <div>
            <h1 style={{textAlign:'center'}}>Post a new Blog</h1>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <input id='title' placeholder='A catchy title' value={title} onChange={({target}) => setTitle(target.value)} style={{margin: 'auto', padding: '15px', fontSize: '2em', border: 0, textAlign: 'center', outlineWidth: 0}}></input>
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




