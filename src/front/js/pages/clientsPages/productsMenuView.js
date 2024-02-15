
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
          Get 20% off on your facial treatments
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
          <td><button className='' onClick={() => setManicure('Traditional')}><i className="fas fa-hand-pointer"></i></button></td>
          <td>$20</td>
        </tr>

        <tr className={""} onClick={() => setManicure('SemiPermanent')}>
          <td>Traditional</td>
          <td><i className="fas fa-hand-pointer"></i></td>
          <td>$40</td>
        </tr>

        <tr className={""} onClick={() => setManicure('GelConstruction')}>
          <td>Gel Construction</td>
          <td><i className="fas fa-hand-pointer"></i></td>
          <td>$60</td>
        </tr>

        <tr className={""} onClick={() => setManicure('Acrylic')}>
          <td>Acrylic</td>
          <td><i className="fas fa-hand-pointer"></i></td>
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
          <td><i className="fa-solid fa-shoe-prints"></i></td>
          <td>$30</td>
        </tr>

        <tr className={""} onClick={() => setPedicure('SemiPermanentPedicure')}>
          <td>Semi permanent</td>
          <td><i className="fa-solid fa-shoe-prints"></i></td>
          <td>$50</td>
        </tr>

        <tr className={""} onClick={() => setPedicure('GelConstructionPedicure')}>
          <td>Gel Construction</td>
          <td><i className="fa-solid fa-shoe-prints"></i></td>
          <td>$70</td>
        </tr>

        <tr className={""} onClick={() => setPedicure('AcrylicPedicure')}>
          <td>Acrylic</td>
          <td><i className="fa-solid fa-shoe-prints"></i></td>
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




