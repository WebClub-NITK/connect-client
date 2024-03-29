import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useParams, Link } from 'react-router-dom'
import { getBlogById } from '../../services/blogsService';
import EditorJs from 'react-editor-js';
import { tools } from './editorConfig'
import styles from './blogStyles'
import Confetti from 'react-dom-confetti';
import {Helmet} from 'react-helmet'

import SyntaxHighlighter from 'react-syntax-highlighter';
// other good themes: monokai, sunburst
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { SERVER_URL } from '../../services/config';
import LikeButton from './LikeButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { getAllComments, addComment } from '../../services/commentsService';
import { Button, Form, InputGroup } from 'react-bootstrap'
import Comments from '../Comments/Comments'
import BookmarkButton from './BookmarkButton';

const Component = (props) => {
    const codeString = props.code
    return (
        <SyntaxHighlighter style={vs2015} customStyle={{ borderRadius: '5px' }}>
            {codeString}
        </SyntaxHighlighter>
    );
};

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
    const [comments, setComments] = useState(null)
    const [newComment, setNewComment] = useState("")

    useEffect(async () => {
        window.scrollTo(0, 0)
        const blog = await getBlogById(blogId)
        const params = new URLSearchParams(window.location.search);
        const url_parts = window.location.hash.split('?')
        const comments = await getAllComments(blogId)

        if(comments) setComments(comments)

        setLoaded(true)
        if (blog) {
            setBlog(blog)
            if (url_parts.length > 1 && url_parts[1].split('=')[1] == 'true') {
                setTimeout(() => {
                    setConfeti(true)
                }, 1000);
            }
            window.history.pushState({}, null, `#/blogs/${blogId}/${blog.title.split(' ').join('-')}`)
        }
    }, [])

    // highlight syntax in code blocks.
    const formatCodeBlocks = () => {
        const editor = document.querySelector('.codex-editor')

        const codeBlocks = editor.querySelectorAll('.ce-code')

        for (const codeBlock of codeBlocks) {
            let codeString = codeBlock.children[0].value
            ReactDOM.render(<Component code={codeString} />, codeBlock)

        }
    }

    const resetComments = async () => {
       
        const comments = await getAllComments(blogId)
        
        if(comments)
            setComments(comments)
    }

    const postComment = async () => {

        if (!localStorage.getItem('UserId')) {
            history.push('/connect/login')
        }

        await addComment(newComment, blogId)

        await resetComments()
        
        setNewComment("")
    }

    if (!loaded) {
        return (
            <h1>Loading</h1>
        )
    }

    if (!blog) {
        return (
            <h1>Not Found</h1>
        )
    }

    return (
        <div style={{ overflowX: 'hidden' }}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{blog.title}</title>
                <description>Check out this blog written by {blog.author_name}</description>
            </Helmet>
            <Confetti className='confeti' active={confeti} config={config} />
            <div style={{ textAlign: 'center' }}>
                <img style={{ maxWidth: '500px', margin: '50px 0', borderRadius: '5px' }} src={blog.coverImageUrl}></img>
                <h1>{blog.title}</h1>
                <p><VisibilityIcon /> {blog.views} <LikeButton likes={blog.likes} blogId={blogId} /> <BookmarkButton bookmarks={blog.bookmarks} blogId={blogId} /></p>
                <p>{blog.tags.map((tag, index) => <span className="badge bg-secondary" key={index} style={styles.tag}>{tag}</span>)}</p>
                <p>Updated On: {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    weekday: "short",
                })}</p>
                <img style={{ width: '50px', borderRadius: '5px' }} src={`${SERVER_URL}/profiles/${blog.author_username}`} />
                <p>{blog.author_name} <Link style={styles.nameLink} to={`/blogs/profile/${blog.author_id}`}>@{blog.author_username}</Link></p>
                {/* <Link style={styles.link} to={`/blogs/${blogId}/update`}><button style={{ padding: '5px 10px', color: 'gray', border: '1px solid gray', background: 'white', borderRadius: '2px' }} >Update</button></Link> */}
            </div>
            <EditorJs
                tools={tools}
                readOnly={true}
                data={JSON.parse(blog.body)}
                logLevel='ERROR'
                onReady={formatCodeBlocks}
            />


<div className="padding" style={{maxWidth: '800px', margin: '0 auto'}}>
                    <h2>Comments</h2>
                    <div className="comments">
                        <InputGroup className="mb-4">
                            <Form.Control 
                                type="text" 
                                placeholder="Add a public comment"
                                value={newComment}
                                onChange={(e)=>setNewComment(e.target.value)}
                            />
                            <InputGroup.Append>
                                <Button onClick={postComment}>
                                    Comment
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>

                        {comments.map((item, index) => {
                            return (
                                <Comments key={index} comment={item} resetComments={resetComments}/>
                            )
                        })}
                    </div>
                </div>
        </div>
    )
}

export default ViewBlog