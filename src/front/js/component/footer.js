import React, { Component } from "react";


export const Footer = () => (
  
  <footer className="footer container-fluid mt-auto py-3 text-center">
    <div className="d-flex justify-content-center">
      <button className="btn btn-home">
        <i className="fa-solid fa-house home-icon"></i>
        <p className="home-text">Home</p>
      </button>

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

    {/* <p>
      Made with <i className="fa fa-heart text-danger" /> by the{" "}
      <a>Tremy Team</a>
    </p> */}
  </footer>
);
