import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {useParams, Link} from 'react-router-dom'
import { getBlogById, likeBlog } from '../../services/blogsService';
import EditorJs from 'react-editor-js';
import {tools} from './editorConfig'
import styles from './blogStyles'
import Confetti from 'react-dom-confetti';

import SyntaxHighlighter from 'react-syntax-highlighter';
// other good themes: monokai, sunburst
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Component = (props) => {
  const codeString = props.code
  return (
    <SyntaxHighlighter style={vs2015} customStyle={{borderRadius: '5px'}}>
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
    const [likes, setLikes] = useState(0)
    const [liked, setLiked] = useState(false)
    const [loaded, setLoaded] = useState(false)
    let { blogId } = useParams();
    const [confeti, setConfeti] = useState(false)

    const userId = localStorage.getItem('UserId');
    const accessToken = localStorage.getItem('accessToken').toString();

    useEffect(async () => {
        window.scrollTo(0, 0)
        const blog = await getBlogById(blogId)
        const params = new URLSearchParams(window.location.search);
        
        setLoaded(true)
        if(blog){
            setBlog(blog)

            setLikes(blog.likes.length)

            if(userId){
                if(blog.likes.includes(userId)) {
                    setLiked(true)
                }
            }

            if(params.get('new')) {
                history.pushState({}, null,`http://localhost:3000/blogs/${blogId}`)
                setTimeout(() => {
                    setConfeti(true)
                }, 1000);
            }
        }
    }, [])

    // highlight syntax in code blocks.
    const formatCodeBlocks = () => {
        const editor = document.querySelector('.codex-editor')

        const codeBlocks = editor.querySelectorAll('.ce-code')
        
        for (const codeBlock of codeBlocks){
            let codeString = codeBlock.children[0].value
            ReactDOM.render(<Component code={codeString} />, codeBlock)
            
        }
    }

    const handleLike = () => {
        if(liked){
            setLikes(likes - 1)
        } else {
            setLikes(likes + 1)
        }
        likeBlog(accessToken, blogId)
        setLiked(!liked)
    }

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
                <img style={{maxWidth: '500px', margin: '50px 0', borderRadius: '5px'}} src={blog.coverImageUrl}></img>
                <h1>{blog.title}</h1>
                <p> <img src={blog.author_profileurl} style={{width: '20px', height: '20px', borderRadius: '5px'}} /> Author: {blog.author_name} <span style={{color: 'gray', fontWeight: 'bold'}}>@{blog.author_username}</span></p>
                <p>{blog.tags.map((tag, index) => <span key={index} style={styles.tag}>{tag}</span>)}</p>
                <p>Updated On: {Date(blog.updatedAt).slice(0,10).replace(/-/g,"")}</p>
                {blog.author_id == userId && <Link style={styles.link} to={`/blogs/${blogId}/update`}><button style={{padding: '5px 10px',color: 'gray', border: '1px solid gray', background: 'white', borderRadius: '2px'}} >Update</button></Link>}
                <button style={{padding: '5px 10px',color: 'gray', border: '1px solid gray', background: 'white', borderRadius: '2px'}} onClick={handleLike}>Likes {likes}</button>
            </div>
            <EditorJs
                    tools={tools}
                    readOnly={true}
                    data={JSON.parse(blog.body)}
                    logLevel='ERROR'
                    onReady={formatCodeBlocks}
            />
        </div>
    )
}

export default ViewBlog