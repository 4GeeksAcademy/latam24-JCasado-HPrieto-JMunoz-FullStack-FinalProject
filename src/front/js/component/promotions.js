import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import manicure from "../../img/manicure.png"
import pedicure from "../../img/pedicure.png"

function Promotions() {

    return (

        <Container fluid className="promotion " >
            <Row className='d-flex justify-content-center'>


                <Col md={3} className="mt-4">
                    <div className="card text-center" role="button">
                        <img src={manicure} className="card-img-top promotion-manicure-img" alt="Promotion 1" />
                        <div className="card-body">
                            <h5 className="card-title">10% off</h5>
                            <p className="card-text">Manicure </p>
                        </div>
                    </div>
                </Col>

                <Col md={3} className="mt-4">
                    <div className="card text-center" role="button">
                        <img src={pedicure} className="card-img-top promotion-manicure-img" alt="Promotion 2" />
                        <div className="card-body">
                            <h5 className="card-title">15% off</h5>
                            <p className="card-text">Pedicure </p>
                        </div>
                    </div>
                </Col>


            </Row>
        </Container>
    );
}


export default Promotions;
