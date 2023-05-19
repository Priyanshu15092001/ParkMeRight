//import React from "react"; 
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import '../ContactUs.css';

const CardGrid = () => {
  return (
    <div className="contact pic">
      <div className="row" style={{textAlign:"center",  marginTop: '100px'}}>
        <h1>Contact Us</h1>
      </div>
      <div className="row">
        <div className="col">
          <div className="card h-100 m">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/003/720/476/small/phone-icon-telephone-icon-symbol-for-app-and-messenger-vector.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title"style={{textAlign:"center"}}>Let's Talk</h5>
              <p className="card-text" style={{textAlign:"center"}}>
                Phone: +91-9876543210
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 m">
            <img src="https://icon-library.com/images/email-icon-jpg/email-icon-jpg-13.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title" style={{textAlign:"center"}}>Drop A Line</h5>
              <p className="card-text" style={{textAlign:"center"}}>Email: xyz@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 m">
            <img src="https://st.depositphotos.com/12694644/56536/v/600/depositphotos_565364652-stock-illustration-operator-icon-isolated-white-background.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title" style={{textAlign:"center"}}>24X7 Support</h5>
              <p className="card-text" style={{textAlign:"center"}}>
              Customer: 1800 101 303
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardGrid;