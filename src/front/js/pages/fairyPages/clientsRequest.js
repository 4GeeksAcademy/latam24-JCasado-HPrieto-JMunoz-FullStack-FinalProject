import React, { useState, useEffect, useContext } from "react";
import { Context } from '../../store/appContext';
import { Card, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import facialPromo2 from "../../../img/facialPromo2.png";


const UserCard = ({ user }) => {

    const navigate = useNavigate();

    const handleSelect = () => {

        navigate(`/fairy/home ${user.id}`);
    };

    return (

        <Card className="d-flex justify-content-center mt-4 mx-3" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={user.avatar} />
            <Card.Body>
                <Card.Title>{user.name} {user.surname}</Card.Title>
                <Card.Text>
                    {user.professional_title}<br />

                    <strong>{user.rating}</strong><i className="fa-regular fa-star mb-1"></i><br />

                    <p className="AvailableTag">Available</p><br />

                    <strong>ETA:</strong> {user.ETA}20 mins<br />
                </Card.Text>

                <div className="d-flex justify-content-between">
                    <Button onClick={handleSelect} className="selectFairybtn mr-auto">Select</Button>
                    <p className="aboutFairybtn ml-auto mt-3" role="button">About</p>
                </div>
            </Card.Body>
        </Card>
    );
}


const GetClients = () => {

    const { store, actions } = useContext(Context);

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    const selectedClients = async () => {

        const products = localStorage.getItem("products");

        if (!products) navigate("/");

    }

    console.log(store.user);

    useEffect(() => {

        selectedClients();

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

                <div className="mt-4 d-flex justify-content-center">
                    
                </div>

            </Container>
        </div>
    );
};


export default GetClients;


