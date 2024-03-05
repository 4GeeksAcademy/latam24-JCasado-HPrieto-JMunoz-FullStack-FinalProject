import React, { useContext, useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../store/appContext';
// import { toast } from "react-toastify";


const FairyMenuView = () => {
  const { store, actions } = useContext(Context);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const [services, setServices] = useState([]);
  const bottomRef = useRef(null);

  const getProducts = async () => {
    const response = await actions.getProducts(params.categoryId);
    setServices(response);
  }

  const selectProduct = (product) => {
    setSelectedProducts([...selectedProducts, product]);
  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [services]);

  const handleNavigation = async () => {
    const response = await actions.addProductToFairy(selectedProducts);
    if (response) {
      navigate("/fairy/home");
      toast.success("Products added to your profile successfully!");
    } else {
      alert("error");
    }
  }

  return (
    <div className="main-container">
      <div className="container d-flex justify-content-center">
        <h5 className="productSelectText mt-5">Please select the line of services you are willing to provide:</h5>
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
      <div ref={bottomRef}></div>
    </div>
  );
};

export default FairyMenuView;






