import React, { useState, useEffect } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://curly-memory-4xwwq4xxjxqcjjrr-3001.app.github.dev/api";

const UserCard = ({ user, onSelect }) => {

    const navigate = useNavigate();

    const handleSelect = () => {

        onSelect(user);
        navigate("/payment");
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


const FairySelection = () => {

    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        const fetchUsers = async () => {

            try {

				const requestConfig = {

					method: "POST",
					headers: {
						"Content-type": "application/json"
					},

					body: JSON.stringify(userData)
				}

                const response = await axios.get(API_URL+"/users", requestConfig); 
                
                setUsers(response.data);

            } catch (error) {

                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleSelectFairy = (selectedUser) => {

        console.log("Selected fairy:", selectedUser);
    };

    return (

        <div className="main-container">
            <Container fluid>
                <div className="d-flex flex-wrap">
                    {users.map((user, index) => (
                        <div key={index} className="mb-4 mr-3">
                            <UserCard user={user} onSelect={handleSelectFairy} />
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


export default FairySelection;
