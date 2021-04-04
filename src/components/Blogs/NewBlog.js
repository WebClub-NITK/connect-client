import React, { useRef, useEffect, useState } from 'react'
import EditorJs from 'react-editor-js';
import { tools } from './editorConfig'
import { saveBlog } from '../../services/blogsService'
import { useHistory } from 'react-router-dom'
import styles from './blogStyles'
import { Prompt } from 'react-router-dom'
import { SERVER_URL } from '../../services/config'
import ErrorMessage from './ErrorMessage';
import {Helmet} from "react-helmet";

const NewBlog = () => {
    let history = useHistory();
    const [errorMessage, setErrorMessage] = useState(null)

    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        return (<h1>Please login to post a blog.</h1>)
    }

    const [coverUrl, setCoverUrl] = useState(null)
    // store the image urls sent to server, .current property stores the list
    let imageUrlsReference = useRef([])

    const instanceRef = useRef(null)

    // function to get editor data
    const getBody = async () => {
        const savedData = await instanceRef.current.save()
        return savedData
    }

    // function to handle image upload by file
    const handleUploadByFile = (file) => {
        // send the image to server which returns a public url after storing
        const formData = new FormData();
        formData.append('image', file);
        let options = {
            method: 'POST',
            body: formData,
        }
        return fetch(`${SERVER_URL}/blogs/file_image_upload`, options)
            .then(res => res.json()).then(data => {
                if (data.success) {
                    imageUrlsReference.current = imageUrlsReference.current.concat(data.file.url)
                }
                return data
            })
    }

    // add the image upload method to the editor tool
    tools.image.config.uploader = {
        uploadByFile: handleUploadByFile
    }

    // to ask for confirmation before leaving website
    useEffect(() => {
        window.addEventListener('beforeunload', cleanUp)

        const url_parts = window.location.hash.split('?')

        if(url_parts.length !== 1) {
            document.getElementById('tags').value = url_parts[1].split('=')[1]
        }


        return () => {
            window.removeEventListener('beforeunload', cleanUp)
        }
    }, [])

    // delete all the unused images from the server
    const cleanUp = async () => {
        // sends a list of urls to the server which then deletes those images.
        if (imageUrlsReference.current.length !== 0) {
            await fetch(`${SERVER_URL}/blogs/remove_images`, {
                method: 'POST',
                body: JSON.stringify({ images: imageUrlsReference.current }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
        }
    }

    const handleSubmitPost = async () => {
        try{

            const title = document.getElementById('title').value
            const tags = document.getElementById('tags').value.split(',').map(item => item.trim())
            const body = await getBody()
    
            const response = await saveBlog(accessToken, {title, body, tags, coverImageUrl: coverUrl})
    
            // image urls used in the post
            let usedImageUrls = []
            body.blocks.forEach(block => {
                if (block.type && block.type === 'image') {
                    if (block.data.file.from_server) {
                        usedImageUrls.push(block.data.file.url)
                    }
                }
            });
    
            // push the cover Url in UsedImagesUrl
            usedImageUrls.push(coverUrl)
    
            // updating the reference with unused image urls
            imageUrlsReference.current = imageUrlsReference.current.filter(url => !usedImageUrls.includes(url))
    
            // delete the unused images
            cleanUp()
            // const response = await saveBlog({ title, body, tags, coverImageUrl: coverUrl })
            history.push(`/blogs/${response._id}?new=true`)
        }catch(err){
            setErrorMessage(err.message)
        }
    }

    const handleCoverChange = async (event) => {
        var fileList = event.target.files;

        // send the image to server and get a public url
        const formData = new FormData();
        formData.append('image', fileList[0]);
        let options = {
            method: 'POST',
            body: formData,
        }
        const response = await fetch(`${SERVER_URL}/blogs/file_image_upload`, options)
            .then(res => res.json()).then(data => {
                if (data.success) {
                    imageUrlsReference.current = imageUrlsReference.current.concat(data.file.url)
                }
                return data
            })

        setCoverUrl(response.file.url)
    }

    const removeCover = () => {
        document.getElementById('file-upload').value = null
        setCoverUrl(null)
    }

    return (
        <div>
            <Prompt
                message={async (location, action) => {
                    // remove unused images if user navigates to a different route.
                    await cleanUp()
                    return true
                }}
            />
            <Helmet>
                <meta charSet="utf-8" />
                <title>Create a new blog!</title>
            </Helmet>
            <ErrorMessage message={errorMessage} setMessage={setErrorMessage} />
            <div style={{ background: 'lightgray', padding: '50px' }}>
                <div style={{ maxWidth: '800px', margin: '10px auto', padding: '50px', background: 'white', borderRadius: '10px' }}>
                    <div style={{}}>
                        {coverUrl && <div style={{ padding: '20px', background: '#e3e6e4', marginBottom: '10px' }}>
                            <img src={coverUrl} style={{ display: 'block', margin: '0 auto 10px auto', maxWidth: '600px', borderRadius: '5px' }}></img>
                            <button onClick={removeCover} style={{ ...styles.saveBlogButton, background: 'white', margin: 'auto' }}>Remove Image</button>
                        </div>}
                        <label style={{ background: 'white', padding: '10px', borderRadius: '5px', color: 'gray' }} htmlFor="file-upload" className="custom-file-upload">
                            Add a cover image
                        </label>
                        <input id="file-upload" className='cover-input' onChange={handleCoverChange} type="file" />
                        <input id='title' placeholder='Add a catchy title' style={{ ...styles.titleInput, textAlign: 'left', fontWeight: 'bold', padding: '0', margin: '20px 0', display: 'block', width: '100%' }}></input>
                        <input id='tags' placeholder='Tags, comma, spaced, values' style={{ ...styles.titleInput, fontSize: '1em', width: '100%', textAlign: 'left', fontWeight: 'lighter', padding: '0', margin: '20px 0', display: 'block' }}></input>
                    </div>
                    <EditorJs
                        instanceRef={(instance) => (instanceRef.current = instance)}
                        tools={tools}
                        placeholder='Share something interesting!'
                        logLevel='WARN'
                    />
                    <button onClick={handleSubmitPost} style={styles.saveBlogButton}>Post</button>
                </div>
            </div>
        </div>
    )
}

export default NewBlog

