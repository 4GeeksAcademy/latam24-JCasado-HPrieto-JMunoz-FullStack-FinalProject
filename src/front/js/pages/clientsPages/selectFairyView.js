import React, { useState, useEffect, useContext } from "react";
import { Context } from '../../store/appContext';
import { Card, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import facialPromo2 from "../../../img/facialPromo2.png";


const UserCard = ({ user }) => {

    const navigate = useNavigate();

    const handleSelect = () => {

        navigate(`/payment/${user.id}`);
    };

    return (

        <Card className="d-flex justify-content-center mt-4 mx-3" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={user.avatar} />
            <Card.Body>
                <Card.Title>{user.name} {user.surname}</Card.Title>
                <Card.Text>
                    {user.professional_title}<br />

                    <i className="fa-regular fa-star mx-2 mb-1"> {user.rating}</i><br />

                    <strong>Availability:</strong> {user.available ? "Available" : "Not Available"}<br />

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

    console.log(store.user);

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

                <div className="mt-4 d-flex justify-content-center">
                    <Card.Img src={facialPromo2} className="facialPromo2" />
                </div>

            </Container>
        </div>
    );
};


export default GetFairies;



