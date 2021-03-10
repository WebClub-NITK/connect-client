/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import React, { useRef, useEffect, useState } from 'react'
import EditorJs from 'react-editor-js';
import { tools } from './editorConfig'
import { updateBlog } from '../../services/blogsService'
import { useHistory } from 'react-router-dom'
import styles from './blogStyles'
import { Prompt } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { getBlogById } from "../../services/blogsService";
import { SERVER_URL } from '../../services/config';

// improvements: cleanup is getting called twice.

const UpdateBlog = () => {
    let history = useHistory();
    let { blogId } = useParams();
    const [loaded, setLoaded] = useState(false);
    const [blog, setBlog] = useState(null);
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState('')
    const [coverUrl, setCoverUrl] = useState(null)
    // store the image urls sent to server, .current property stores the list
    let imageUrlsReference = useRef([])
    let blogBodyReference = useRef([])
    let coverImageUrlReference = useRef('')

    useEffect(async () => {
        const blog = await getBlogById(blogId);

        setLoaded(true);
        if (blog) {
            setTitle(blog.title)
            setTags(blog.tags)
            setCoverUrl(blog.coverImageUrl)
            coverImageUrlReference.current = blog.coverImageUrl
            setBlog(blog);
            blogBodyReference.current = JSON.parse(blog.body)

            // image urls used in the post
            let usedImageUrls = []
            JSON.parse(blog.body).blocks.forEach(block => {
                if (block.type && block.type === 'image') {
                    if (block.data.file.from_server) {
                        usedImageUrls.push(block.data.file.url)
                    }
                }
            });

            // push the cover Url in UsedImagesUrl
            usedImageUrls.push(blog.coverImageUrl)

            imageUrlsReference.current = usedImageUrls
        }
    }, []);



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
        return () => {
            window.removeEventListener('beforeunload', cleanUp)
        }
    }, [])

    // delete all the unused images from the server
    const cleanUp = async () => {

        // using state would result in initialised values.
        // only references are used here

        // image urls used in the post
        let usedImageUrls = []

        blogBodyReference.current.blocks.forEach(block => {
            if (block.type && block.type === 'image') {
                if (block.data.file.from_server) {
                    usedImageUrls.push(block.data.file.url)
                }
            }
        });

        // push the cover Url in UsedImagesUrl
        usedImageUrls.push(coverImageUrlReference.current)
        // updating the reference with unused image urls
        imageUrlsReference.current = imageUrlsReference.current.filter(url => !usedImageUrls.includes(url))

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
        const title = document.getElementById('title').value
        const tags = document.getElementById('tags').value.split(',')
        const body = await getBody()
        blogBodyReference.current = body
        coverImageUrlReference.current = coverUrl

        const response = await updateBlog(blogId, { title, body, tags, coverImageUrl: coverUrl })
        cleanUp()
        history.push(`/blogs/${response._id}`)
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

    if (!loaded) {
        return <h1>Loading</h1>;
    }

    if (!blog) {
        return <h1>Not Found</h1>;
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
            <div style={{ background: 'lightgray', padding: '50px' }}>
                <div style={{ width: '50vw', margin: '10px auto', padding: '50px', background: 'white', borderRadius: '10px' }}>
                    <div style={{}}>
                        {coverUrl && <div style={{ padding: '20px', background: '#e3e6e4', marginBottom: '10px' }}>
                            <img src={coverUrl} style={{ display: 'block', margin: '0 auto 10px auto', maxWidth: '600px', borderRadius: '5px' }}></img>
                            <button onClick={removeCover} style={{ ...styles.saveBlogButton, background: 'white', margin: 'auto' }}>Remove Image</button>
                        </div>}
                        <label style={{ background: 'white', padding: '10px', borderRadius: '5px', color: 'gray' }} htmlFor="file-upload" className="custom-file-upload">
                            Add a cover image
                        </label>
                        <input id="file-upload" className='cover-input' onChange={handleCoverChange} type="file" />
                        <input id='title' value={title} placeholder='Add a catchy title' onChange={({ target }) => setTitle(target.value)} style={{ ...styles.titleInput, textAlign: 'left', fontWeight: 'bold', padding: '0', margin: '20px 0', display: 'block' }}></input>
                        <input id='tags' value={tags} placeholder='Tags, comma, spaced, values' onChange={({ target }) => setTags(target.value)} style={{ ...styles.titleInput, fontSize: '1em', width: '100%', textAlign: 'left', fontWeight: 'lighter', padding: '0', margin: '20px 0', display: 'block' }}></input>
                    </div>
                    <EditorJs
                        instanceRef={(instance) => (instanceRef.current = instance)}
                        tools={tools}
                        data={JSON.parse(blog.body)}
                        placeholder='Share something interesting!'
                        logLevel='WARN'
                    />
                    <button onClick={handleSubmitPost} style={styles.saveBlogButton}>Update</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateBlog

