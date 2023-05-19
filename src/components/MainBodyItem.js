import React from "react";
import { Link } from "react-router-dom";
import "../style.css";
function MainBodyItem(props) {
  return (
    <div className="my-3">
      <div
        className="card"
        style={{ width: "20rem", height: "5.2cm", backgroundColor: "#173F73" }}
      >
        <div className="card-body" style={{ padding: "17px 10px 10px 15px",color:"white" }}>
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">
            <strong>Address:</strong>
            {props.address} <br />
         
          
            {props.slots2W !== null ? (
              <>
                <strong>2 Wheeler slots available:</strong>
                {props.slots2W} <strong>Rate:</strong>
                {props.rate2W}{" "}
              </>
            ) : (
              ""
            )}
            <br />
            {props.slots4W !== null ? (
              <>
                <strong>4 Wheeler slots available:</strong>
                {props.slots4W} <strong>Rate:</strong>
                {props.rate4W}{" "}
              </>
            ) : (
              ""
            )}
          </p>
          <Link
            className="btn btn-primary"
            to="/BookingSystem"
            state={{
              loc: props.name,
              address: props.address,
              id: props._id,
              slots2W: props.slots2W,
              rate2W: props.rate2W,
              slots4W: props.slots4W,
              rate4W: props.rate4W,
            }}
          >
            Book
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MainBodyItem;
