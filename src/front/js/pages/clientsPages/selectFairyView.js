import React, { useState, useEffect, useContext } from "react";
import { Context } from '../../store/appContext';
import { Card, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import facialPromo2 from "../../../img/facialPromo2.png";


const UserCard = ({ user }) => {

    const products = JSON.parse(localStorage.getItem("products"))

    console.log(products);

    const navigate = useNavigate();

    const handleSelect = () => {

        navigate(`/payment/${user.id}`);
    };

    return (

        <Card className="d-flex justify-content-center mt-4 mx-3" style={{ width: "18rem", borderColor: 'rgb(242, 226, 247)' }}>
            <Card.Body>
                <Card.Title>{user.name} {user.surname}</Card.Title>
                <Card.Text>
                    {user.professional_title}<br />
                    <strong>{user.rating}</strong><i className="star fa-regular fa-star mb-1"></i><br />
                    <span className="AvailableTag">Available</span><br />
                    <strong>ETA:</strong><span className="eta"> {user.ETA}20 mins</span><br />
                </Card.Text>
                <h5>Services:</h5>
                {products.map((product) => {
                    return (<div className="mb-1 fw-bold text-muted" key={product.id}>
                        {product.name} ${product.price}
                    </div>)
                })}

                <div className="d-flex justify-content-between mt-4">
                    <Button onClick={handleSelect} className="selectFairybtn mr-auto">Select</Button>
                    <span className="aboutFairybtn ml-auto mt-2" role="button">About</span>
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

                <div className="mt-4 d-flex justify-content-center">
                    <Card.Img src={facialPromo2} className="facialPromo2" />
                </div>

            </Container>
        </div>
    );
};


export default GetFairies;



