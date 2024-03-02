import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { Button, Container, Row, Col, ProgressBar } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Promotions from "../../component/promotions";
import img1Facial from "../../../img/1.png";
import img2HairCut from "../../../img/2.png";
import img3Makeup from "../../../img/3.png";
import img4Eyes from "../../../img/4.png";
import img5Nails from "../../../img/5.png";
import img6Wax from "../../../img/6.png";
import facialPromo1 from "../../../img/facialPromo1.png";
import avatar from "../../../img/barbaraGordon.png";4

const ClientHome = () => {

    const { store } = useContext(Context);

    const [selectedService, setSelectedService] = useState(null);

    const navigate = useNavigate();

    const serviceImages = {
        "manicure-&-pedicure": img5Nails,
        "lashes-&-eyebrows": img4Eyes,
        "hairdressing": img2HairCut,
        "facial-treatments": img1Facial,
        "makeup": img3Makeup,
        "waxing": img6Wax
    };

    const handleServiceSelection = (service) => {

        setSelectedService(service);

        navigate("/productsMenuView");
    };

    return (

        <>
            <div className="clientHome">
                <Container fluid className="main-container">
                    <div className="d-flex justify-content-center">
                        <div className="row container mt-4">
                            <div className="d-flex justify-content-end col-6">
                                <div className="mt-5">
                                    <h1 className="facial_care card-title text-info">Facial Care Treatment</h1>
                                    <h4 className="facial_care-promo mt-2">15% Off</h4><br />
                                    <Button variant="info" className="text-white">Buy Now</Button>
                                </div>
                            </div>

                            <div className="promo-image-clinetView d-flex justify-content-center col-6">
                                <img className="rounded mt-2 mb-2" src={facialPromo1} height={290} width={260} alt="Facial Care" />
                            </div>
                        </div>
                    </div>

                    <Row className="mt-4">
                        <h4 className="mx-3 mb-3"><strong>Services</strong></h4>
                        {store.services.map((service, index) => (
                            <Col md={4} onClick={() => navigate(`/products/${service.id}`)} key={index} className="mb-4  d-flex justify-content-center ">
                                <div className={`card w-75 ${selectedService === service ? 'selected' : ''}`} role="button" >
                                    <div className="card-body d-flex gap-3 align-items-center">
                                        <img src={serviceImages[service.name.replaceAll(" ","-").toLowerCase()]} alt={`Service ${service.id}`} />
                                        <h5>{service.name}</h5>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>

                    <h4 className="mx-3 mt-4 mb-3"><strong>Next Appointment</strong></h4>
                    <div className="card">
                        <Col md={12}>
                            <div className="nextAppointment card-body">
                                <div className="d-flex align-items-center justify-content-center gap-3">
                                    <img src={avatar} alt="User Avatar" className="avatar-img" />
                                    <Col md={6}>
                                        <h5 className="card-title">Miss Barbara Gordon</h5>
                                        <p className="title">Cosmetologist / Nail Tech</p>
                                        <p className="time-text d-flex align-items-center gap-1">
                                            10:02 AM
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="clock">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            <br />
                                        </p>
                                    </Col>

                                    <div className="button gap-2 d-flex justify-content-end">
                                        <Button variant="success" className="button_whatsapp" >
                                            <span> Chat </span>
                                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 5000 5000" preserveAspectRatio="xMidYMid meet">
                                                <g id="layer101" fill="#000000" stroke="none">
                                                </g>
                                                <g id="layer102" fill="#02e677" stroke="none">
                                                    <path d="M2256 4879 c-279 -18 -569 -100 -827 -234 -244 -128 -246 -128 -287 -117 -20 5 -89 24 -152 42 -173 48 -337 90 -410 105 -36 8 -91 23 -122 34 -32 12 -69 21 -82 21 -14 0 -36 4 -50 10 -22 8 -28 6 -42 -15 -14 -22 -14 -30 5 -102 11 -43 23 -89 27 -103 10 -42 50 -185 109 -393 77 -269 77 -272 -10 -417 -144 -243 -251 -510 -301 -750 -50 -242 -54 -633 -9 -875 24 -132 109 -433 152 -539 110 -271 277 -519 503 -747 197 -198 419 -358 664 -479 233 -115 402 -170 681 -221 149 -27 470 -37 624 -20 181 21 494 93 595 136 17 7 67 28 111 47 175 72 379 197 550 335 540 435 861 1063 904 1768 32 521 -93 1003 -369 1416 -263 393 -578 676 -965 864 -419 204 -772 267 -1299 234z" />
                                                </g>
                                                <g id="layer103" fill="#f6fefa" stroke="none">
                                                    <path d="M3175 3834 c-11 -2 -46 -11 -78 -20 -31 -8 -82 -19 -112 -24 -30 -5 -69 -16 -87 -24 -18 -8 -55 -20 -83 -27 -27 -6 -59 -17 -70 -24 -11 -6 -38 -18 -60 -25 -22 -7 -60 -23 -85 -36 -25 -13 -52 -24 -62 -24 -9 0 -24 -7 -33 -16 -9 -9 -31 -22 -48 -28 -27 -10 -93 -44 -147 -77 -8 -5 -31 -18 -51 -28 -19 -11 -41 -27 -48 -35 -8 -9 -20 -16 -27 -16 -8 0 -22 -8 -32 -17 -10 -10 -45 -36 -78 -58 -95 -63 -167 -127 -364 -325 -219 -218 -323 -339 -411 -475 -14 -22 -34 -53 -45 -69 -54 -80 -154 -269 -154 -290 0 -8 -7 -19 -15 -26 -8 -7 -18 -28 -21 -49 -4 -20 -18 -65 -32 -101 -22 -59 -25 -79 -25 -220 -1 -150 1 -158 32 -250 18 -52 39 -102 47 -111 8 -8 14 -19 14 -24 0 -16 91 -145 134 -190 37 -39 64 -58 146 -102 36 -19 242 -18 279 2 38 19 74 63 100 122 13 26 33 71 46 98 13 28 35 75 49 105 14 30 26 61 26 68 0 7 9 30 20 50 51 96 74 167 78 250 3 83 3 84 -35 140 -21 31 -46 64 -55 74 -10 10 -18 21 -18 26 0 4 -20 29 -45 55 -95 99 -90 165 25 332 107 154 248 306 389 420 40 33 84 70 98 83 13 12 28 22 32 22 4 0 16 9 25 19 10 11 32 25 49 32 18 7 39 18 47 25 21 17 140 80 170 89 14 4 31 12 38 18 8 6 43 21 79 34 61 21 66 21 91 6 30 -18 158 -149 224 -229 64 -76 98 -97 162 -96 40 0 68 8 111 31 32 17 63 31 70 31 7 0 18 7 25 15 7 9 32 20 56 26 24 6 49 17 55 25 6 8 30 19 53 25 22 6 52 19 66 29 14 10 39 21 57 24 18 4 42 15 55 25 13 10 37 21 53 25 17 4 42 19 58 34 24 23 27 33 27 92 0 45 -8 89 -25 138 -14 39 -25 78 -25 86 0 24 -83 118 -161 182 -135 111 -286 172 -443 179 -50 2 -100 2 -111 -1z" />
                                                </g>
                                            </svg>
                                        </Button>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-center align-items-center mt-4">
                                    <div className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon_sparkle">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                                        </svg>
                                    </div>
                                    <Col xs={6} md={4} lg={8} className="text-center">
                                        <ProgressBar striped variant="info" now={35} className="mt-4 mb-3" />
                                    </Col>
                                    <div className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icon_crown">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </div>
                    <Promotions />
                </Container>
            </div>
        </>
    );
};


export default ClientHome;
