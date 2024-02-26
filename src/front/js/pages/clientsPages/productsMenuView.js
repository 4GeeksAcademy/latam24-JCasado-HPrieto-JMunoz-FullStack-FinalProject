import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import manicurepromo from "../../../img/manicurepromo.png"
import { Context } from '../../store/appContext';


const OfferCard = () => {

  return (

    <div className="manicure_promo d-flex container align-items-center mt-5">
      <div className="card-body">
        <h3 className="manicure_promo-text card-title">Express traditional manicure</h3>
        <h5 className="manicure_promo-text card-text" >Done in 20 minutes!</h5><br />
        <Button variant="info" className="text-white">Buy Now</Button>
      </div>
      <img className="rounded mt-2 mb-2" src={manicurepromo} height={250} width={150} />
    </div>
  );
};


const ProductsMenu = () => {

  const { store, actions } = useContext(Context)

  const [selectedProducts, setSelectedProducts] = useState([])

  const navigate = useNavigate()

  const handleNavigation = () => {

    if (selectedProducts.length == 0) {

      return
    }

    localStorage.setItem("products", JSON.stringify(selectedProducts))

    navigate("/select-fairy")
  }

  const params = useParams()

  const [services, setServices] = useState([]);

  const getProducts = async () => {

    const response = await actions.getProducts(params.categoryId)

    setServices(response)
  }

  const selectProduct = (product) => {

    setSelectedProducts([...selectedProducts, product])
  }

  useEffect(() => {

    getProducts()

  }, [])

  return (

    <Container fluid className="main-container">
      <OfferCard />

      <Row className="justify-content-center mt-5">
        {services.map((service) => (
          <Col key={service.id + "serviceId"} md={5} className="text-center">
            <h3 className="serviceName card mb-3">{service.name}</h3>
            <Row>
              {service.service_products.map((product) => (
                <Col key={product.id + "product"} md={12} className="mb-3">
                  <Card className="h-100 border-0">
                    <button className="productButton btn" onClick={() => selectProduct(product)}>
                      <Card.Body className="d-flex align-items-center justify-content-center">
                        {product.name} ${product.price}
                      </Card.Body>
                    </button>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        ))}
      </Row>

      <Row>
        <Col md={12} className="text-center mt-3">
          <Button variant="info" className='text-white' onClick={() => handleNavigation()}>Confirm Selection</Button>
        </Col>
      </Row>
    </Container>
  );
};


export default ProductsMenu;





