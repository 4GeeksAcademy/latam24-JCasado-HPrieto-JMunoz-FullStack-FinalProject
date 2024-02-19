
import React, { useState } from 'react';
import { Container, Row, Col, Table, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const OfferCard = () => {

  return (

    <Card className="mt-4">
      <img src="url_to_your_image" alt="Offer" className="card-img-top" />
      
      <Card.Body>
        <Card.Title>Special Offer</Card.Title>

        <Card.Text>
          Get 20% off on your facial treatments today!
        </Card.Text>

      </Card.Body>

    </Card>

  );
};


const ManicureTable = ({ setManicure }) => {

  return (

    <Table striped bordered hover>
      <tbody>
        <tr className={""}>
          <td>Traditional</td>
          <td><button className='' onClick={() => setManicure('Traditional')}><i className="fa-solid fa-hand"></i></button></td>
          <td>$20</td>
        </tr>

        <tr className={""} onClick={() => setManicure('SemiPermanent')}>
          <td>Semi permanent</td>
          <td><button className='' onClick={() => setManicure('Semi permanent')}><i className="fa-solid fa-hand"></i></button></td>
          <td>$40</td>
        </tr>

        <tr className={""} onClick={() => setManicure('GelConstruction')}>
          <td>Construction Gel</td>
          <td><button className='' onClick={() => setManicure('Construction Gel')}><i className="fa-solid fa-hand"></i></button></td>
          <td>$60</td>
        </tr>

        <tr className={""} onClick={() => setManicure('Acrylic')}>
          <td>Acrylic</td>
          <td><button className='' onClick={() => setManicure('Acrylic')}><i className="fa-solid fa-hand"></i></button></td>
          <td>$80</td>
        </tr>
        
      </tbody>
    </Table>

  );
};


const PedicureTable = ({ setPedicure }) => {


  return (

    <Table striped bordered hover>
      <tbody>

        <tr className={""} onClick={() => setPedicure('TraditionalPedicure')}>
          <td>Traditional</td>
          <td><button className='' onClick={() => setManicure('Traditional')}><i className="fa-solid fa-paw"></i></button></td>
          <td>$30</td>
        </tr>

        <tr className={""} onClick={() => setPedicure('SemiPermanentPedicure')}>
          <td>Semi-Permanent</td>
          <td><button className='' onClick={() => setManicure('Semi-Permanent')}><i className="fa-solid fa-paw"></i></button></td>
          <td>$50</td>
        </tr>

        <tr className={""} onClick={() => setPedicure('GelConstructionPedicure')}>
          <td>Construction Gel</td>
          <td><button className='' onClick={() => setManicure('Construction Gel')}><i className="fa-solid fa-paw"></i></button></td>
          <td>$70</td>
        </tr>

        <tr className={""} onClick={() => setPedicure('AcrylicPedicure')}>
          <td>Acrylic</td>
          <td><button className='' onClick={() => setManicure('Acrylic')}><i className="fa-solid fa-paw"></i></button></td>
          <td>$90</td>
        </tr>

      </tbody>
    </Table>

  );
};


const ProductsMenu = () => {

  const [ manicure, setManicure ] = useState("");

  const [ pedicure, setPedicure] = useState("");  


  const navigate = useNavigate()

  const handleConfirmSelection = () => {
    
    navigate("/select-fairy")

    console.log('Manicure:', manicure);

    console.log('Pedicure:', pedicure);

  };


  return (

    <div>
    
      <Container fluid>

        <div>
          <Col md={6}>
            <h2>Manicure</h2>
            <ManicureTable setManicure={setManicure} />
          </Col>

          <Col md={6}>
            <h2>Pedicure</h2>
            <PedicureTable setPedicure={setPedicure} />
          </Col>
        </div>

        <div>
          <Col md={12}>
            <OfferCard />
          </Col>
        </div>

        <div>
          <Col md={12} className="text-center">
            <Button variant="primary" onClick={handleConfirmSelection}>Confirm Selection</Button>
          </Col>
        </div>

      </Container>
    </div>

  );
};


export default ProductsMenu;




