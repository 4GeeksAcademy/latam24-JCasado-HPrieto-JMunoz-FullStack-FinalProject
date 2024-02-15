
import React, { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Navbar, Nav, Form, FormControl, Button, Badge } from 'react-bootstrap';
import tremyImageUrl from "../../img/tremy-logo.png";

const NavbarTop = () => { 
  
  return ( 
    
    <Navbar bg="#EBC5F6FF" variant="#EBC5F6FF">
      <Navbar.Brand href="#home"><img src={tremyImageUrl} style={{ width: "10px", height: "auto"}}/></Navbar.Brand>
      
	  <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#menu">Menu</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>

      <Form>
        <FormControl type="text" className="mr-sm-2" />

        <Button variant="outline-info">Search</Button>

        <Nav.Link href="#notifications">

          <i className="fas fa-bell"></i>

          <Badge variant="danger">4</Badge>

        </Nav.Link>

        <Nav.Link href="#profile">

          <img src="avatar.png" alt="User Avatar" style={{ width: '100px', height: '90px', borderRadius: '50%' }} />

        </Nav.Link>
      </Form>
    </Navbar>
 );
}


export default NavbarTop;