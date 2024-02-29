import React from 'react';
import { Card, Button } from 'react-bootstrap';
import fairyOptionsImage from "../../img/fairyOptionsImage.jpg"


const FairyOptionsCard = () => {

    return (

        <Card>
            <Card.Body className="fairyOptionsCard">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-7 mt-2">
                        <Button className="optionsButton mb-2 mr-2">Get your new tools now</Button><br />
                        <Button className="optionsButton mb-2 mr-2">Get your new working apparel</Button><br />
                        <Button className="optionsButton mb-2 mr-2">Submit a new certificate</Button><br />
                        <Button className="optionsButton mb-2 mr-2">Learn new skills</Button><br />
                        <Button className="optionsButton mr-2">Schedule appointment with manager</Button>
                    </div>
                    <div className="col-md-3">
                        <img className="fairyOptionsImage img-fluid" src={fairyOptionsImage} alt="Fairy Options" />
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};


export default FairyOptionsCard;