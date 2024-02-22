
import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Table, Card, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import manicurepromo from "../../../img/manicurepromo.png"
import { Context } from '../../store/appContext';

const OfferCard = () => {

  return (
    <Row className='manicure_promo'>
      <Col md={12} className="mt-4  container">

        <div className=" d-flex container align-items-center ">
          <div className="card-body">
            <h4 className=" manicure_promo-text card-title text-uppercase ">Express Traditional manicure </h4>

            <Button variant="info" className="text-white">Buy Now</Button>
          </div>
          <img className="rounded" src={manicurepromo} height={330} />
        </div>

      </Col>
    </Row>

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
          <td><button className='' onClick={() => setPedicure('Traditional')}><i className="fa-solid fa-paw"></i></button></td>
          <td>$30</td>
        </tr>

        <tr className={""} onClick={() => setPedicure('SemiPermanentPedicure')}>
          <td>Semi Permanent</td>
          <td><button className='' onClick={() => setPedicure('Semi Permanent')}><i className="fa-solid fa-paw"></i></button></td>
          <td>$50</td>
        </tr>

        <tr className={""} onClick={() => setPedicure('GelConstructionPedicure')}>
          <td>Construction Gel</td>
          <td><button className='' onClick={() => setPedicure('Construction Gel')}><i className="fa-solid fa-paw"></i></button></td>
          <td>$70</td>
        </tr>

        <tr className={""} onClick={() => setPedicure('AcrylicPedicure')}>
          <td>Acrylic</td>
          <td><button className='' onClick={() => setPedicure('Acrylic')}><i className="fa-solid fa-paw"></i></button></td>
          <td>$90</td>
        </tr>

      </tbody>
    </Table>

  );
};


const ProductsMenu = () => {

  const { store, actions } = useContext(Context)

  const [manicure, setManicure] = useState("");

  const [pedicure, setPedicure] = useState("");


  const navigate = useNavigate()

  const handleConfirmSelection = () => {

    navigate("/select-fairy")

    console.log('Manicure:', manicure);

    console.log('Pedicure:', pedicure);

  };

  const params = useParams()

  const [services, setServices] = useState([]);

  const getProducts = async () => {

    const response = await actions.getProducts(params.categoryId)

    setServices(response)

    console.log(response);
  }

  useEffect(() => {

    getProducts()

  }, [])

  return (

    <div>

      <Container fluid className='main-container'>

        <div>
          <Col md={12}>
            <OfferCard />
          </Col>
        </div>
        <h1 className='mt-2'>Services</h1>
        <p>Sit ullamco eiusmod enim ullamco ipsum</p>
        <div>
          {services.map((service) => (
            <div key={service.id + "serviceId"}>
              <h2>{service.name}</h2>
              <div>
                {service.service_products.map((product) => (
                  <div>
                    {product.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>



        <div>
          <Col md={12} className="text-center mt-3">
            <Button variant="info" className='text-white' onClick={handleConfirmSelection}>Confirm Selection</Button>
          </Col>
        </div>

      </Container>
    </div>

  );
};


export default ProductsMenu;




