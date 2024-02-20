import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { Container, Row, Col } from 'react-bootstrap';

function Services() {
    
    const { store } = useContext(Context);

    return (

        <Container fluid className="service">
            <Row>
                {store.services && store.services.length > 0 && store.services.map((service, index) => {

                    return (

                        <Col key={index} md={6} className="mt-4">
                            <div className="card">
                                <img src="image1.jpg" className="card-img-top" alt={`Promotion ${index + 1}`} />
                                <div className="card-body">
                                    <h5 className="card-title">{service.name}</h5>
                                    <p className="card-text">{service.description}</p>
                                </div>
                            </div>
                        </Col>

                    );
                })}

            </Row>
        </Container>
    );
}


export default Services;
