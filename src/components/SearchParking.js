import React from "react";
import { Link } from "react-router-dom";
import img from "../images/parkingLot.jpg";
export default function SearchParking() {
  return (
    <div
      style={{
        height: "100vh",
        paddingTop: "3cm",
      }}
    >
    
      <div
        className="my-3 d-flex  justify-content-evenly"
        style={{ marginLeft: "4cm" }}
      >
        <div className="card " style={{ width: "18rem" }}>
          <img
            src="https://i0.wp.com/healthwealthbridge.com/wp-content/uploads/2019/08/SHER-E-PUNJAB-RESTAURANT-KOLKATA-REVIEW.jpg?resize=500%2C243&ssl=1"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Shere Punjab</h5>
            <p className="card-text">
              Open: 24x7 <br />
              Rate: Rs 40 per hour <br />
              Space Available: 30
            </p>
            <Link to="/BookingSystem">
              <button className="btn btn-primary">Book</button>
            </Link>
          </div>
        </div>

        <div className="card" style={{ width: "18rem" }}>
          <img
            src="https://content.jdmagicbox.com/comp/mumbai/h8/9999p3228.3228.180602094710.i5h8/catalogue/matangini-guest-house-mecheda-mecheda-guest-house-qjr0vi0nlc-250.jpg?clr="
            className="card-img-top"
            alt="..."
            style={{height:'3.7cm'}}
          />
          <div className="card-body">
            <h5 className="card-title">Mecheda</h5>
            <p className="card-text">
              Open: 24x7 <br />
              Rate: Rs 10 per hour <br />
              Space Available: 60
            </p>
            <Link to="/BookingSystem">
              <button className="btn btn-primary">Book</button>
            </Link>
          </div>
        </div>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src="https://images.indianexpress.com/2017/12/parking.jpg?w=389"
            className="card-img-top"
            alt="..."
            style={{height:'3.7cm'}}
          />
          <div className="card-body">
            <h5 className="card-title">Haldia More</h5>
            <p className="card-text">
              Open: 24x7 <br />
              Rate: Rs 10 per hour <br />
              Space Available: 60
            </p>
            <Link to="/BookingSystem">
              <button className="btn btn-primary">Book</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
