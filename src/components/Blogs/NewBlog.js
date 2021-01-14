import React, {useState, useRef} from 'react'
import EditorJs from 'react-editor-js';
import {tools} from './editorConfig'
import {saveBlog} from '../../services/blogsService'
import {useHistory} from 'react-router-dom'
import styles from './blogStyles'

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
            <div style={{background:'lightgray', padding: '50px'}}>
                <div style={{width:'50vw', margin: '10px auto', padding: '50px', background: 'white', borderRadius: '10px'}}>
                    <div style={{}}>
                        <button style={{background: 'white', padding: '10px', display: 'block'}}>Add a cover image</button>
                        <input id='title' placeholder='Add a catchy title' style={{...styles.titleInput, textAlign: 'left', fontWeight: 'bold', padding: '0', margin: '20px 0', display: 'block'}}></input>
                        <input id='tags' placeholder='Tags, comma, spaced, values' style={{...styles.titleInput, fontSize: '1em', width: '100%', textAlign: 'left', fontWeight: 'lighter', padding: '0', margin: '20px 0', display: 'block'}}></input>
                    </div>
                    <EditorJs
                        instanceRef={(instance) => (instanceRef.current = instance)}
                        tools={tools}
                        placeholder='Share something interesting!'
                        logLevel='WARN'
                    />
                    <button onClick={handleClick} style={styles.saveBlogButton}>Post</button>
                </div>
            </div>
        </div>
    )
}

export default NewBlog




