import React, { useState, useEffect, useContext } from "react";
import { Context } from '../../store/appContext';
import { Card, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



const UserCard = ({ user }) => {

    const navigate = useNavigate();

    const handleSelect = () => {

        navigate(`/payment/${user.id}`);
    };

    return (

        <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={user.avatar} />
            <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>
                    <strong>Title:</strong> {user.professionalTitle}<br />
                    <strong>Rating:</strong> {user.rating}/5 Stars<br />
                    <strong>Availability:</strong> {user.available ? "Available" : "Not Available"}<br />
                    <strong>ETA:</strong> {user.ETA} mins<br />
                </Card.Text>

                <div className="d-flex justify-content-between">
                    <Button variant="primary" onClick={handleSelect} className="mr-auto">Select</Button>
                    <Button variant="secondary" className="ml-auto">About</Button>
                </div>
            </Card.Body>
        </Card>
    );
};


const GetFairies = () => {

    const { store, actions } = useContext(Context);

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    const selectedFairies = async () => {

        const products = localStorage.getItem("products");

        if (!products) navigate("/");

        const fairies = await actions.getFairies(JSON.parse(products));

        setUsers(fairies);

    }

    useEffect(() => {

        selectedFairies();

    }, []);



    return (

        <div className="main-container">
            <Container fluid>
                <div className="d-flex flex-wrap">
                    {users.map((user, index) => (
                        <div key={index} className="mb-4 mr-3">
                            <UserCard user={user} />
                        </div>
                    ))}
                </div>

                <div className="mt-4">
                    <Card>
                        <Card.Img variant="top" src="url" />
                        <Card.Body>
                            <Card.Title>Special Promotion</Card.Title>
                            <Card.Text>
                                Get 15% off on facial care
                            </Card.Text>
                            <Button variant="primary">Learn More</Button>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </div>
    );
};


export default GetFairies;


