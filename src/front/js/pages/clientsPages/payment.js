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
            <h2 className="text-center m-2">Payment Confirmation</h2>
            <Card className="d-flex">
                <Card.Body>
                    <Card.Title>Service Details</Card.Title>
                    <div>
                        <strong>Service:</strong>{" "}
                        {products &&
                            products.map((product) => {

                                return <div key={product.id + product.name}>{product.name}</div>;
                            })}
                    </div>
                    <p>
                        <strong>Fairy:</strong> {fairy && `${fairy.name} ${fairy.surname}`}
                    </p>
                </Card.Body>
            </Card>

            <Card className="mt-4">
                <Card.Body>
                    <Card.Title className="text-center">Payment Information</Card.Title>
                    <Form.Label className="fw-bold">Voucher</Form.Label>
                    <Form.Group controlId="formVoucher" className="mb-2 d-flex gap-2 align-items-center">
                        <Form.Control type="text" placeholder="Enter voucher code" value={voucher} onChange={(e) => setVoucher(e.target.value)} />
                        <Button variant="info text-white">Apply</Button>
                    </Form.Group>

                    <Form.Group controlId="formPaymentMethod">
                        <h4 className="text-center mt-4">Total</h4>
                        <h2 className="text-center mb-3">${total}</h2>
                        <PayPalScriptProvider options={{ clientId: process.env.PAYPAL_CLIENT_ID }}>
                            <PayPalButtons createOrder={createOrder} style={{ layout: "horizontal" }} />
                        </PayPalScriptProvider>
                    </Form.Group>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Payment;