import React, { useState, useEffect, useContext } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Context } from "../../store/appContext";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";


const Payment = () => {

    const { store, actions } = useContext(Context);

    const [voucher, setVoucher] = useState("");

    const [products, setProducts] = useState();

    const [total, setTotal] = useState(0);

    const [fairy, setFairy] = useState();

    const [paymentMethod, setPaymentMethod] = useState("credit_card");

    const handlePayment = () => {

    };

    const params = useParams();

    const getFairyById = async () => {

        const fairyData = await actions.getUsers(params.id);

        if (fairyData) {

            console.log(fairyData);
            setFairy(fairyData);
        }
    };

    const PayPalInitialOptions = {

        clientId: process.env.PAYPAL_CLIENT_ID,
    };


    const createOrder = async () => {

        const response = await fetch(

            process.env.BACKEND_URL + "/api/create/paypal",

            {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },

                body: JSON.stringify({ products: products.map((product) => product.id) })
            }
        )

        if (response.ok) {

            const data = await response.json()

            console.log(data)

            return data.order_id;
        }
    }


    const onApprove = async (data) => {

        console.log(data);

        const response = await fetch(

            process.env.BACKEND_URL + "/api/create/order",

            {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${store.token}`,
                    "Content-type": "application/json"
                },

                body: JSON.stringify({ payment_confirmation: data.paymentId, fairy_id: params.id, price: total, items: products })

            }

        )

        console.log(response);
    }


    useEffect(() => {

        getFairyById();

        const localProducts = localStorage.getItem("products");

        if (localProducts) {

            const parsedProducts = JSON.parse(localProducts);

            setProducts(parsedProducts);

            let counter = 0;

            parsedProducts.forEach((item) => {

                counter += item.price;
            });
            setTotal(counter);

            console.log(JSON.parse(localProducts));
        }

    }, []);

    return (

        <Container className="main-container">
            <h3 className="paymentTitle1 text-center">Payment Confirmation</h3>
            <Card className="confirmOrderCard d-flex">
                <Card.Body>
                    <Card.Title><h5 className="mb-2">Order Details</h5></Card.Title>
                    <div>
                        <strong>Service: </strong>
                        {products && products.map((product) => (
                            <span className="paymentDetails" key={product.id + product.name}>{product.name}{" "}</span>
                        ))}
                    </div>
                    <p>
                        <strong>Fairy:</strong>
                        <span className="paymentDetails"> {fairy && `${fairy.name} ${fairy.surname}`} </span>
                        <span className="paymentDetailsAvailable">
                            (available now <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="clock" style={{ width: '1em', height: '1em' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>)
                        </span>
                    </p>
                </Card.Body>
            </Card>

            <Card className="confirmOrderCard mt-4">
                <Card.Body>
                    <Card.Title><h5 className="paymentTitle2 text-center mt-2 mb-2">Please confirm your oder!</h5></Card.Title>
                    <div className="voucherText fw-bold mb-1">Apply Voucher</div>
                    <Form.Group controlId="formVoucher" className="mb-2 d-flex gap-2 align-items-center">
                        <Form.Control type="text" placeholder="Enter voucher code" value={voucher} onChange={(e) => setVoucher(e.target.value)} />
                        <Button variant="info text-white">Apply</Button>
                    </Form.Group>

                    <Form.Group controlId="formPaymentMethod">
                        <h4 className="totalText text-center mt-2">Total</h4>
                        <h2 className="text-center mb-2">${total}</h2>

                        <div className="paypalButtonContainer">
                            <PayPalScriptProvider options={{ clientId: process.env.PAYPAL_CLIENT_ID }}>
                                <PayPalButtons createOrder={createOrder} onApprove={onApprove} className="bigPayPalButton" style={{ layout: "horizontal" }} />
                            </PayPalScriptProvider>
                        </div>
                    </Form.Group>
                </Card.Body>
            </Card>
        </Container>
    );
};


export default Payment;