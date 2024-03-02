import React, { Component } from "react";
import { Link } from "react-router-dom";


export const FairyFooter = () => (
  
  <footer className="fairyFooter container-fluid mt-auto py-3 text-center">
    <div className="d-flex justify-content-center">
      <Link to="/fairy/home">
        <button className="btn btn-home">
          <i className="fa-solid fa-house home-icon"></i>
          <p className="home-text">Home</p>
        </button>
      </Link>

      <button className="btn btn-calendar">
        <i className="fa-regular fa-calendar calendar-icon"></i>
        <p className="calendar-text">Appointments</p>
      </button>

      <button className="btn btn-message">
        <i className="fa-regular fa-message message-icon"></i>
        <p className="message-text">Inbox</p>
      </button>

      <button className="btn btn-gear">
        <i className="fa-solid fa-gear gear-icon"></i>
        <p className="gear-text">Settings</p>
      </button>
    </div>
    
  </footer>
);

export default FairyFooter; 