import { Button, Col } from 'react-bootstrap'
import IconButton from './IconButton'
import { useState } from 'react'
import NewPostal from './NewPostal'
import ChatBoxModal from './ChatBoxModal'



export default function ProfileSideBar({ handleLogout }) {
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [showChatBot, setShowChatBot] = useState(false)
    const handleCloseChatBot = () => setShowChatBot(false)
    const handleShowChatBot = () => setShowChatBot(true)
    return (
        <Col sm={2}
            className='d-flex flex-column justify-content-start align-items-center vh-100 bg-light'
            style={{ position: 'sticky', top: 0 }}
        >
            <IconButton className="bi bi-twitter" isTop />
            <IconButton className="bi bi-house" text="Home" />
            <IconButton className="bi bi-search" text="Explore" />
            <IconButton className="bi bi-bell" text="Notifications" />
            <IconButton className="bi bi-envelope" text="Messages" />
            <IconButton className="bi bi-journal-text" text="Lists" />
            <IconButton className="bi bi-bookmark" text="Bookmarks" />
            <IconButton className="bi bi-patch-check" text="Verified" />
            <IconButton className="bi bi-person" text="Profile" />
            <IconButton className="bi bi-chat-square-text" text="Chatbot" onClick={handleShowChatBot} />
            <IconButton
                className="bi bi-door-closed"
                text="Logout"
                onClick={handleLogout}
            />
            <Button onClick={handleShow} className='rounded-pill w-100 mb-3' >Tweet</Button>
            <NewPostal show={show} handleClose={handleClose} />
            <ChatBoxModal show={showChatBot} handleClose={handleCloseChatBot} />





        </Col>
    )
}
