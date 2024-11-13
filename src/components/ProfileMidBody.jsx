import { Button, Col, Image, Nav, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ProfilePostCard from "./ProfilePostCard";
import { useContext, useEffect } from "react";
import { AuthContext, fetchPosts } from "../features/posts/postSlice";


export default function ProfileMidBody() {


    const ur = "https://pbs.twimg.com/profile_banners/83072625/1602845571/1500x500";
    const pic = "https://res.cloudinary.com/dqcztgs4v/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1731489494/WhatsApp_Image_2024-11-13_at_4.15.52_PM_htd5x8.jpg";
    const posts = useSelector((state) => state.posts.posts)
    const loading = useSelector((state) => state.posts.loading)
    const dispatch = useDispatch()
    const { currentUser } = useContext(AuthContext)
    useEffect(() => {
        dispatch(fetchPosts(currentUser.uid))
    }, [dispatch, currentUser])




    return (
        <Col sm={6} className="bg-light" style={{ border: "1px solid lightgrey" }}>
            <Image src={ur} fluid />
            <br />

            <Image
                src={pic}
                roundedCircle
                style={{
                    width: 150,
                    position: "absolute",
                    top: "140px",
                    border: "4px solid #F8F9FA",
                    marginLeft: 15,
                }}
            />

            <Row className="justify-content-end">
                <Col xs="auto">
                    <Button className="rounded-pill mt-2" variant="outline-secondary">
                        Edit Profile
                    </Button>
                </Col>
            </Row>

            <p className="mt-5" style={{ margin: 0, fontWeight: "bold", fontSize: "15px" }}>
                Papi
            </p>

            <p style={{ marginBottom: "2px" }}>@ppp</p>

            <p> I am a full stack developer</p>

            <p>Web developer</p>

            <p>
                <strong>271</strong> Folowwing <strong>610</strong> Followers
            </p>

            <Nav variant="underline" defaultActiveKey="/home" justify>
                <Nav.Item>
                    <Nav.Link eventKey="/home">Tweets</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/link-1">Replies</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/link-2">Highlights</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/link-3">Media</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/link-4">Likes</Nav.Link>
                </Nav.Item>
            </Nav>
            {loading && (<Spinner animation='border' className='ms-3 mt-3' variant='primary' />)}
            {posts.map((post) => (<ProfilePostCard key={post.id} post={post} />))}





        </Col>

    )
}
