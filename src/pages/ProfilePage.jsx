import { getAuth } from "firebase/auth";
import { useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProfileMidBody from "../components/ProfileMidBody";
import ProfileSideBar from "../components/ProfileSideBar";
import { AuthContext } from "../features/posts/postSlice";


export default function ProfilePage() {
    const auth = getAuth()
    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext)


    if (!currentUser) {
        navigate('/login')
    }



    const handleLogout = () => {
        auth.signOut()

    };

    return (
        <>
            <Container className="mt-3">
                <Row>

                    <ProfileSideBar handleLogout={handleLogout} />
                    <ProfileMidBody />

                </Row>

            </Container>

        </>
    );
}
