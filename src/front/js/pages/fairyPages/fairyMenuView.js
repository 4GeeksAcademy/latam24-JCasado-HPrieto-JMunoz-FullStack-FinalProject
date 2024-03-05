import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../store/appContext';
import { toast } from "react-toastify";


const FairyMenuView = () => {
  
  const { store, actions } = useContext(Context)
  
  const [selectedProducts, setSelectedProducts] = useState([])

  const navigate = useNavigate()
  
  const handleNavigation = async () => {

    const response = await actions.addProductToFairy(selectedProducts)
    
    if (response) {

      navigate("/fairy/home");

    } else {

      alert("error");

    }

    console.log(selectedProducts);
  }

  const params = useParams()

  const [services, setServices] = useState([]);

  const getProducts = async () => {

    const response = await actions.getProducts(params.categoryId)

    setServices(response)
  }

  const notify = () => toast.success("Products added to your profile successfully!");
  
  const selectProduct = (product) => {


    setSelectedProducts([...selectedProducts, product])
  }

  useEffect(() => {

    getProducts()

  }, [])

  return (
    
    <Container fluid className="main-container">
      <div className="container mb-2 mt-5">
        <h5 className="productSelectText">Please select the line of services you are willing to provide:</h5>
      </div>
      <Row className="justify-content-center mt-5">
        {services.map((service) => (
          <Col key={service.id + "serviceId"} md={5} className="text-center">
            <h3 className="serviceName card mb-3">{service.name}</h3>
            <Row>
              {service.service_products.map((product) => (
                <Col key={product.id + "product"} md={12} className="mb-3">
                  <Card className="h-100 border-0">
                    <button className={`productButton btn ${selectedProducts.includes(product) && "productActive"}`} onClick={() => selectProduct(product)}>
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


export default FairyMenuView;






