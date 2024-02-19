import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const FairyHome = () => {

  return (

    <Container className="mt-4">
      <Row>
        <Col>
          <h1>Next Appointments</h1>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Next Appointment</Card.Title>

              <Card.Text>
                <strong>Name:</strong> Selina Kyle<br />
                <strong>Location:</strong> 9725 NW 104 st #410 Miami FL 33178<br />
                <strong>Time:</strong> 10:02 AM<br />
                <strong>Date:</strong> February 20, 2024
              </Card.Text>

            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Upcoming Appointment</Card.Title>

              <Card.Text>
                <strong>Name:</strong> Mr. John Doe<br />
                <strong>Location:</strong> 1234 Main Street, Anytown, USA<br />
                <strong>Time:</strong> 2:30 PM<br />
                <strong>Date:</strong> February 25, 2024
              </Card.Text>

            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container>

  );
};


export default FairyHome;