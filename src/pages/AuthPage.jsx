import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../features/posts/postSlice";



export default function AuthPage() {
    const loginImage = 'https://sig1.co/img-twitter-1'

    const [modalShow, setModalShow] = useState(null)
    const handleShowSignUp = () => setModalShow('Signup')
    const handleShowLogin = () => setModalShow('Login')
    const handleClose = () => setModalShow(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const auth = getAuth()
    const { currentUser } = useContext(AuthContext)


    useEffect(() => {
        if (currentUser) {
            navigate('/profile')
        }
    }, [currentUser, navigate])




    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            const res = await createUserWithEmailAndPassword(auth, username, password)
            console.log(res.user)

        } catch (error) {
            console.error(error)
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, username, password)

        } catch (error) {
            console.error(error)
        }
    }

    const provider = new GoogleAuthProvider()
    const handleGoogle = async (e) => {
        e.preventDefault()
        try {
            await signInWithPopup(auth, provider)

        }
        catch (error) {
            console.error(error)
        }
    }


    return (
        <Row>
            <Col sm={6}>
                <Image src={loginImage} fluid />
            </Col>

            <Col sm={6}>
                <i className="bi bi-twitter" style={{ fontSize: 50, color: 'dodgerblue' }}></i>

                <p className="mt -5" style={{ fontSize: 64 }}>Happening Now</p>
                <h2 className="my-5" style={{ fontSize: 31 }}>Join Twitter Today</h2>

                <Col sm={5} className="d-grid gap-2">
                    <Button onClick={handleGoogle} className="rounded-pill" variant="outline-dark">
                        <i className="bi bi-google"></i> Sign up with Google
                    </Button>
                    <Button className="rounded-pill" variant="outline-dark">
                        <i className="bi bi-apple"></i> Sign up with Apple
                    </Button>
                    <p style={{ textAlign: 'center' }}>or</p>
                    <Button className="rounded-pill" onClick={handleShowSignUp}>Create an account</Button>
                    <p style={{ fontSize: '12px' }}>
                        By signing up, vou agree to the Terms of Service and Privacy Policy including Cookie Use
                    </p>
                    <p className="mt-5" style={{ fontWeight: 'bold' }}>
                        Already have an account
                    </p>
                    <Button className="rounded-pill" variant="outline-primary" onClick={handleShowLogin}>Sign in</Button>
                </Col>

                <Modal animation={false} centered show={modalShow !== null} onHide={handleClose}>
                    <Modal.Body >
                        <h2 className="mb-4" style={{ fontWeight: 'bold' }}>
                            {modalShow === 'Signup' ? 'Create your account' : 'log in to your account'}
                            Create Your Account
                        </h2>
                        <Form className="d-grid gap-2 px-5" onSubmit={modalShow === 'Signup' ? handleSignUp : handleLogin}>
                            <Form.Group className="mb-3" controlId="BasicEmail">
                                <Form.Control
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="email" placeholder="enter email"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="BasicPass">
                                <Form.Control
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password" placeholder="enter passowrd"
                                />
                            </Form.Group>
                            <Button className="rounded-pill" type="submit">
                                {modalShow === 'Signup' ? 'Signup' : 'Login'}
                            </Button>

                        </Form>
                        <p style={{ fontSize: '12px' }}>
                            By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. PPP may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy, like keeping your account seceure and personalising our services, including ads. Learn more. Others will be able to find you by email or phone number, when provided, unless you choose otherwise here.
                        </p>


                    </Modal.Body>
                </Modal>

            </Col>
        </Row>
    )
}
