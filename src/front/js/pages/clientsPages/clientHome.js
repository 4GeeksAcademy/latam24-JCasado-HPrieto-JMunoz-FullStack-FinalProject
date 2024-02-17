import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Promotions from "../../component/promotions";
import Services from "../../component/Services";


const ClientHome = () => {

    const [selectedService, setSelectedService] = useState(null);

    const [serviceMenu, setServiceMenu] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        
        fetchServiceMenu();

    }, []);

    const fetchServiceMenu = async () => {

        try {

            const response = await fetch("/api/services");

            if (!response.ok) {

                throw new Error('Failed to fetch service menu');
            }

            const data = await response.json();

            setServiceMenu(data);

        } catch (error) {

            console.error('Error fetching service menu:', error.message);
        }
    };

    const handleServiceSelection = (service) => {

        setSelectedService(service);

        navigate("/productsMenuView");
    };

    return (

        <div>
            <Container fluid>
                <Row>

                    <Col md={8} className="mt-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Promotion</h5>
                                <p className="card-text">Facial Care 30% off</p>
                                <Button variant="primary">Buy Now</Button>
                            </div>
                        </div>
                    </Col>

                </Row>

                <Services />

                <Row className="mt-4">
                    {serviceMenu.map((service, index) => (

                        <Col md={2} key={index}>
                            <div className={`card mb-4 ${selectedService === service ? 'selected' : ''}`} onClick={() => handleServiceSelection(service)}>
                                <div className="card-body">
                                    <h5 className="card-title">{service.name}</h5>
                                    <i role="button" className="fas fa-cog fa-3x"></i>
                                </div>
                            </div>
                        </Col>
                    ))}

                </Row>

                <Row className="mt-4">
                    <Col md={8}>
                        <div className="card">
                            <div className="card-header">Next Appointment</div>
                            <div className="card-body">
                                
                                <Row>
                                    <Col md={2}>
                                        <img src="avatar.png" alt="User Avatar" className="avatar-img" />
                                    </Col>

                                    <Col md={10}>
                                        <h5 className="card-title">Miss Ana Gomez</h5>
                                        <p className="card-text">
                                            Time: 10:02 AM
                                            <br />
                                            Location: 9725 NW 104 st #410 Miami FL 33178
                                        </p>

                                        <Button variant="success" >
                                            <i className="fab fa-whatsapp"></i> WhatsApp
                                        </Button>
                                    </Col>
                                </Row>

                            </div>
                        </div>
                    </Col>
                </Row>

                <Promotions />
            </Container>
        </div>
    );
}


export default ClientHome;


