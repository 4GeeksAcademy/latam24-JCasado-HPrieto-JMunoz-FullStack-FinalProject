
import React, { useState, useEffect, useContext } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import visa from "../../../img/visa.png"
import mastercard from "../../../img/mastercard.png"
import paypal from "../../../img/paypal.png"
import { useParams } from "react-router-dom";
import { Context } from "../../store/appContext";

const PaymentConfirmation = ({ }) => {

    const { store, actions } = useContext(Context)

    const [voucher, setVoucher] = useState("");

    const [products, setProducts] = useState();

    const [total, setTotal] = useState(0);

    const [fairy, setFairy] = useState()

    const [paymentMethod, setPaymentMethod] = useState("credit_card");

    const handlePayment = () => {

    };

    const params = useParams()

    const getFairyById = async () => {

        const fairyData = await actions.getUsers(params.id)

        if (fairyData) {

            console.log(fairyData)

            setFairy(fairyData)

        }
    }

    useEffect(() => {

        getFairyById()

        const localProducts = localStorage.getItem("products")

        if (localProducts) {

            const parsedProducts = JSON.parse(localProducts)

            setProducts(parsedProducts)

            let counter = 0;

            parsedProducts.forEach(item => {

                counter += item.price

            });

            setTotal(counter);

            console.log(JSON.parse(localProducts));
        }
    }, [])

    return (

        <Container className="main-container" >
            <h2 className="text-center m-2">Payment Confirmation</h2>
            <Card className="d-flex">
                <Card.Body>
                    <Card.Title>Service Details</Card.Title>
                    <div><strong>Service:</strong> {
                        products && products.map((product) => {
                            return (
                                <div key={product.id + product.name}>{product.name}</div>
                            )
                        })
                    }</div>
                    <p><strong>Fairy:</strong> {fairy && `${fairy.name} ${fairy.surname}`}</p>
                </Card.Body>
            </Card>

            <Card className="mt-4">
                <Card.Body>
                    <Card.Title className="text-center">Payment Information</Card.Title>
                    <Form.Label className="fw-bold">Voucher</Form.Label>
                    <Form.Group controlId="formVoucher" className="mb-2 d-flex gap-2 align-items-center">

                        <Form.Control
                            type="text"
                            placeholder="Enter voucher code"
                            value={voucher}
                            onChange={(e) => setVoucher(e.target.value)}
                        />
                        <Button variant="info text-white" >
                            Apply
                        </Button>
                    </Form.Group>

                    <Form.Group controlId="formPaymentMethod">
                        <Form.Label className="mb-3">Payment Method</Form.Label>

                        <Form.Control
                            as="select"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="mb-4"
                        >
                            <option value="credit_card">Credit Card</option>
                            <option value="debit_card">Debit Card</option>
                            <option value="paypal">PayPal</option>

                        </Form.Control>

                        <h4 className="text-center">Total</h4>
                        <h2 className="text-center">{total}</h2>

                        <div className="visa d-flex gap-2 mb-3 ">
                            <img src={visa} height={30} width={80} alt="visa" />
                            <p>******2334</p>
                            <input type="radio" />
                        </div>
                        <div className="mastercard d-flex gap-2 mb-3">
                            <img src={mastercard} height={40} width={65} alt="visa" />
                            <p>******3774</p>
                            <input type="radio" />
                        </div>
                        <div className="paypal d-flex gap-2 mb-3">
                            <img src={paypal} height={30} width={90} alt="visa" />
                            <p>mail@mail.com</p>
                            <input type="radio" />
                        </div>


                    </Form.Group>
                    <div className="d-flex justify-content-center wx-100">
                        <Button variant="info text-white mt-2 " onClick={handlePayment}>Confirm Payment</Button>
                    </div>


                </Card.Body>
            </Card>

        </Container>
    );
};


export default PaymentConfirmation;
