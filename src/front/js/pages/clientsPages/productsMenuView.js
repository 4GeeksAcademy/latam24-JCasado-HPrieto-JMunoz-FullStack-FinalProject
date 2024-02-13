
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


const ManicureTable = ({ handleSelection }) => {

  const [selectedManicure, setSelectedManicure] = useState(null);

  const selectManicure = (manicure) => {

    setSelectedManicure(manicure);
    handleSelection(manicure);

  };

  return (

    <Table striped bordered hover>
      <tbody>
        <tr className={selectedManicure === 'Traditional' ? 'selected' : ''} onClick={() => selectManicure('Traditional')}>
          <div>Traditional</div>
          <div><i className="fas fa-hand-pointer"></i></div>
          <div>$20</div>
        </tr>

        <tr className={selectedManicure === 'SemiPermanent' ? 'selected' : ''} onClick={() => selectManicure('SemiPermanent')}>
          <div>Traditional</div>
          <div><i className="fas fa-hand-pointer"></i></div>
          <div>$40</div>
        </tr>

        <tr className={selectedManicure === 'GelConstruction' ? 'selected' : ''} onClick={() => selectManicure('GelConstruction')}>
          <div>Gel Construction</div>
          <div><i className="fas fa-hand-pointer"></i></div>
          <div>$60</div>
        </tr>

        <tr className={selectedManicure === 'Acrylic' ? 'selected' : ''} onClick={() => selectManicure('Acrylic')}>
          <div>Acrylic</div>
          <div><i className="fas fa-hand-pointer"></i></div>
          <div>$80</div>
        </tr>
        
      </tbody>
    </Table>

  );
};


const PedicureTable = ({ handleSelection }) => {

  const [selectedPedicure, setSelectedPedicure] = useState(null);

  const selectPedicure = (pedicure) => {

    setSelectedPedicure(pedicure);
    handleSelection(pedicure);

  };

  return (

    <Table striped bordered hover>
      <tbody>

        <div className={selectedPedicure === 'Traditional' ? 'selected' : ''} onClick={() => selectPedicure('Traditional')}>
          <div>Traditional</div>
          <div><i className="fas fa-footprints"></i></div>
          <div>$30</div>
        </div>

        <div className={selectedPedicure === 'SemiPermanent' ? 'selected' : ''} onClick={() => selectPedicure('SemiPermanent')}>
          <div>Semi permanent</div>
          <div><i className="fas fa-footprints"></i></div>
          <div>$50</div>
        </div>

        <div className={selectedPedicure === 'GelConstruction' ? 'selected' : ''} onClick={() => selectPedicure('GelConstruction')}>
          <div>Gel Construction</div>
          <div><i className="fas fa-footprints"></i></div>
          <div>$70</div>
        </div>

        <div className={selectedPedicure === 'Acrylic' ? 'selected' : ''} onClick={() => selectPedicure('Acrylic')}>
          <div>Acrylic</div>
          <div><i className="fas fa-footprints"></i></div>
          <div>$90</div>
        </div>

      </tbody>
    </Table>

  );
};


const ProductsMenu = () => {

  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleSelection = (product) => {

    if (selectedProducts.includes(product)) {

      setSelectedProducts(selectedProducts.filter(item => item !== product));

    } else {

      setSelectedProducts([...selectedProducts, product]);

    }
  };


  const navigate = useNavigate()

  const handleConfirmSelection = () => {
    navigate("/select-fairy")

    console.log('Selected products:', selectedProducts);

  };


  return (

    <div>
    
      <Container fluid>

        <div>
          <Col md={6}>
            <h2>Manicure</h2>
            <ManicureTable handleSelection={handleSelection} />
          </Col>

          <Col md={6}>
            <h2>Pedicure</h2>
            <PedicureTable handleSelection={handleSelection} />
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




