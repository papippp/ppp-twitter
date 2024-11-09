import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"



export default function ChatBoxModal({ show, handleClose }) {
    const [message, setMessage] = useState('')
    const [allMessage, setAllMessage] = useState([])


    const sendMessage = async (e) => {
        e.preventDefault()
        const API_URL = 'https://api.openai.com/v1/chat/completions'
        const apiKey = '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'
        const messagesToSend = [
            ...allMessage,
            {
                role: 'user',
                content: message
            }
        ]
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: messagesToSend
            })
        })
        const data = await response.json()
        if (data) {
            let newAllmessages = [
                ...messagesToSend,
                data.choices[0].message
            ]
            setAllMessage(newAllmessages)
            setMessage('')
        }

    }
    return (
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton className="fs-4">
                AI Chatbot
            </Modal.Header>
            <Modal.Body>
                <div>
                    {allMessage.map((msg, index) => (
                        <p key={index}>
                            <strong>{msg.role}</strong> {msg.content}
                        </p>
                    ))}
                </div>
                <Form onSubmit={sendMessage}>
                    <Form.Control
                        type="text"
                        placeholder="Ask chatbot something ..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button type="submit" className="mt-3">Send</Button>

                </Form>
            </Modal.Body>


        </Modal>


    )
}
