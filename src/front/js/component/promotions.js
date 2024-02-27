import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import manicure from "../../img/manicure.png"
import pedicure from "../../img/pedicure.png"
import wax from "../../img/wax.jpg"

function Promotions() {

    return (
       
            <Container fluid className="promotion mt-4" >
                <h4 className="mx-3 mt-4"><strong>Limited Time Promotions</strong></h4>
                <div className="d-flex justify-content-center row">

                    <div className="mt-2 col-6 col-lg-3 ">
                        <div className="card text-center" role="button">
                            <img src={manicure} className="card-img-top" alt="Promotion 1" />
                            <div className="card-body">
                                <h5 className="card-title">10% off</h5>
                                <p className="card-text">Manicure </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-2 col-6 col-lg-3 ">
                        <div className="card text-center" role="button">
                            <img src={wax} className="card-img-top promotion-img" alt="Promotion 2" />
                            <div className="card-body">
                                <h5 className="card-title">12% off</h5>
                                <p className="card-text">Brazilian Bikini</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-2 col-6 col-lg-3 ">
                        <div className="card text-center" role="button">
                            <img src={pedicure} className="card-img-top" alt="Promotion 3" />
                            <div className="card-body">
                                <h5 className="card-title">15% off</h5>
                                <p className="card-text">Pedicure </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        
    );
}


export default Promotions;
