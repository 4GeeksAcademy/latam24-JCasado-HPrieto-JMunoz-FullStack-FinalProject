
import React, { useState } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";


const PaymentConfirmation = ({ selectedFairy, service, date, time, onSubmit }) => {

    const [voucher, setVoucher] = useState("");

    const [paymentMethod, setPaymentMethod] = useState("credit_card");

    const handlePayment = () => {

        const paymentDetails = {
            selectedFairy,
            service,
            date,
            time,
            voucher,
            paymentMethod
        };

        onSubmit(paymentDetails);

    };

    return (

        <Container>
            <h2>Payment Confirmation</h2>
            <Card>
                <Card.Body>
                    <Card.Title>Service Details</Card.Title>
                    <p><strong>Service:</strong> {service}</p>
                    <p><strong>Fairy:</strong> {selectedFairy.name}</p>
                    <p><strong>Date:</strong> {date}</p>
                    <p><strong>Time:</strong> {time}</p>
                </Card.Body>
            </Card>

            <Card className="mt-4">
                <Card.Body>
                    <Card.Title>Payment Information</Card.Title>

                    <Form.Group controlId="formVoucher">
                        <Form.Label>Voucher</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter voucher code"
                            value={voucher}
                            onChange={(e) => setVoucher(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPaymentMethod">
                        <Form.Label>Payment Method</Form.Label>

                        <Form.Control
                            as="select"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="credit_card">Credit Card</option>
                            <option value="debit_card">Debit Card</option>
                            <option value="paypal">PayPal</option>

                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" onClick={handlePayment}>Confirm Payment</Button>

                </Card.Body>
            </Card>

        </Container>
    );
};


export default PaymentConfirmation;
