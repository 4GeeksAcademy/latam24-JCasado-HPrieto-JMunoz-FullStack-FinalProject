import React from 'react';
import { Card, Button } from 'react-bootstrap';


const FairyOptionsCard = () => {

  return (

    <Card>
      <Card.Body>
        <Card.Title className="mb-3">Choose an Option</Card.Title>
        <Button className="optionsButton mb-2 mr-2">Get your new tools now</Button><br/>
        <Button className="optionsButton mb-2 mr-2">Get your new working apparel</Button><br/>
        <Button className="optionsButton mb-2 mr-2">Learn new skills</Button><br/>
        <Button className="optionsButton mb-2 mr-2">Schedule appointment with manager</Button>
      </Card.Body>
    </Card>
  );
};


export default FairyOptionsCard;