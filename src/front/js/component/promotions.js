
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';


function Promotions() {

    return (

        <Container fluid className="promotion">
            <Row>

            
                <Col md={6} className="mt-4">
                    <div className="card">
                        <img src="image1.jpg" className="card-img-top" alt="Promotion 1" />
                        <div className="card-body">
                            <h5 className="card-title">Promotion 1</h5>
                            <p className="card-text">Manicure 10% off</p>
                        </div>
                    </div>
                </Col>
            
                    <Col md={6} className="mt-4">
                    <div className="card">
                        <img src="image2.jpg" className="card-img-top" alt="Promotion 2" />
                        <div className="card-body">
                            <h5 className="card-title">Promotion 2</h5>
                            <p className="card-text">Pedicure 15% off</p>
                        </div>
                    </div>
                </Col>
            

            </Row>
        </Container>
    );
}


export default Promotions;
