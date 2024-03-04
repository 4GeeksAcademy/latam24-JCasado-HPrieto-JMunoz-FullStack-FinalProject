import React, { useState, useEffect, useContext } from "react";
import { Context } from '../../store/appContext';
import { Card, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const UserCard = ({ order }) => {

    console.log(order)

    
    const navigate = useNavigate();

    const handleSelect = () => {

        navigate(`/fairy/home`);
    };

    return (

        <Card className="d-flex justify-content-center mt-4 mx-3" style={{ width: "18rem", borderColor: 'rgb(194, 237, 249)' }}>
            {/* <Card.Img variant="top" src={order.avatar} /> */}
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <Card.Title>{order.client.name} {order.client.surname}</Card.Title>
                    <p className="aboutFairybtn ml-auto" role="button">About</p>
                </div>
                <Card.Text>
                    {order.client.address}<br />

                    <strong>{order.client.rating}</strong><i className="fa-regular fa-star mb-1"></i><br />
                    <strong>ETA:</strong><span className="eta"> {order.client.ETA}20 minutes</span> <br />
                </Card.Text>

                <ul className="list-group mb-1">{order.products.map((product) => (<li key={`${product.id}`} className="orderProductList list-group-item">{product.product.name}</li>))}</ul>
                <div className="d-flex justify-content-between mx-3">
                    <strong><p>Total</p></strong>
                    <Card.Text><strong>${order.price} </strong></Card.Text>
                </div>
                <div className="d-flex justify-content-between">
                    <Button onClick={handleSelect} className="selectClientbtn mr-auto">Accept</Button><br />
                    <Button onClick={handleSelect} className="declineClientbtn mr-auto">Decline</Button>
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

        const clients = await actions.getClients();

        console.log(clients)

        if (clients.msg) return

        setUsers(clients);

    }

    console.log(store.user);

    useEffect(() => {

        selectedClients();

    }, []);



    return (

        <div className="main-container">
            <Container fluid>
                <div className="d-flex flex-wrap">
                    {users.map((order, index) => (
                        <div key={`${index}-${order.id}`} className="mb-4 mr-3">
                            <UserCard order={order} />
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


