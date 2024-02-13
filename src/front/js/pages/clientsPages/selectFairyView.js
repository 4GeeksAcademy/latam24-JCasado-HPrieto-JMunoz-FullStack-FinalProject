import React from "react";
import { Card, Button, Container } from "react-bootstrap";

const UserCard = ({ user }) => {

    return (

        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={user.avatar} />
            <Card.Body>
                <Card.Title>{user.name}</Card.Title>

                <Card.Text>
                    <strong>Title:</strong> {user.professionalTitle}<br />
                    <strong>Rating:</strong> {user.rating}/5 stars<br />
                    <strong>ETA:</strong> {user.ETA} mins<br />
                    <strong>Availability:</strong> {user.available ? "Available" : "Not Available"}
                </Card.Text>

                <Button variant="primary">Select</Button>
                <Button variant="secondary" className="mt-2">About</Button>

            </Card.Body>

        </Card>

    );
};



const FairySelection = () => {

    return (

        <div>
            <Container fluid>
                <div>
                    <div md={4}>
                        <h2>Fairy</h2>
                        <UserCard
                            user={{
                                avatar: "url",
                                name: "Fairy Name",
                                professionalTitle: "Cosmetologist / Nail tech",
                                rating: 4.9,
                                ETA: 20,
                                available: true
                            }}
                        />
                    </div>

                    <div md={4}>
                        <h2>Fairy</h2>
                        <UserCard
                            user={{
                                avatar: "url",
                                name: "Miss Monica Alvarez",
                                professionalTitle: "Nail Technician",
                                rating: 4.5,
                                ETA: 30,
                                available: true
                            }}
                        />
                    </div>

                    <div md={4}>
                        <h2>Fairy</h2>
                        <UserCard
                            user={{
                                avatar: "url",
                                name: "Mr Carlos Hernandez",
                                professionalTitle: "Beautician / Nail technician",
                                rating: 4.3,
                                ETA: 15,
                                available: true
                            }}
                        />
                    </div>
                </div>
               
                <div className="mt-4">

                    <Card>
                        <Card.Img variant="top" src="url" />
                        <Card.Body>
                            <Card.Title>Special Promotion</Card.Title>
                            <Card.Text>
                                Get 20% off on your next service
                            </Card.Text>
                            <Button variant="primary">Learn More</Button>
                        </Card.Body>
                    </Card>

                </div>

            </Container>

        </div>
    );
};



export default FairySelection;