import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Accordion, Button, Card, Form, InputGroup } from 'react-bootstrap'
import {addReply} from '../../../services/resourceService'
import { useHistory } from 'react-router';

const Replies = ({replies, commentId, resetComments}) => {

    const [newReply, setNewReply] = useState("");

    const history = useHistory()

    const postReply = async () => {

        if (!localStorage.getItem('UserId')) {
            history.push('/connect/login')
        }
        
        await addReply(newReply, commentId)

        await resetComments()

        setNewReply("")
    }

    return (
        <div>
            <Accordion>
                <Card>
                    <Card.Header className="bg-white">
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Replies
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body className="bg-light">
                            <InputGroup className="mb-3">
                                <Form.Control 
                                    type="text" 
                                    placeholder="Add a public reply"
                                    value={newReply}
                                    onChange={(e)=>setNewReply(e.target.value)}
                                />
                                <InputGroup.Append>
                                    <Button onClick={postReply}>
                                        Reply
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>

                            {replies.map((item, index) => {
                                return (
                                    <div className="mb-2" key={index}>
                                        <div>
                                            <div><strong>{item.user.Username}</strong></div>
                                            {item.text}
                                        </div>
                                    </div>
                                )
                            })}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    )
}

Replies.propTypes = {
    replies: PropTypes.node,
    commentId: PropTypes.node,
    resetComments: PropTypes.node,
};

export default Replies
