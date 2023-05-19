import React, { useEffect, useState } from "react";
import img from "../images/parkingLot.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import Razorpay from 'razorpay';
function BookingSystem(props) {
  const [time, setTime] = useState("");
  const [license, setLicense] = useState("");
  const [duration, setDuration] = useState(0);
  const [vehicleType, setVehicleType] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [transactionId, setTransactionId] = useState("");
  // const[rate,setRate]=useState(0);
  const [json, setJson] = useState();
  const location = useLocation();
  console.log(new Date());

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {navigate("/")};
  }, []);

  const booking = async (tranId) => {
    const response = await fetch(
      `http://localhost:5000/api/parkingbooking/booking/${location.state.id}`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
          "auth-cust": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          vehicleType: vehicleType,
          registrationNo: license,
          startTime: time,
          duration: duration,
          payment: true,
          transactionId: tranId,
        }),
      }
    );
   const j=await response.json();

    const response2 = await fetch(
      `http://localhost:5000/api/location/updateslots/book/${location.state.id}/${vehicleType}`,
      {method:"PUT"}
    );
    const json2 = await response2.json();
    sessionStorage.setItem("loc",location.state.loc);
    sessionStorage.setItem("locID",location.state.id);
    sessionStorage.setItem("vehicleType",vehicleType);
    sessionStorage.setItem("bookingId",j.bookingId);
    sessionStorage.setItem("checkIn",j.startTime);
    sessionStorage.setItem("duration",j.duration);
    sessionStorage.setItem("rate",j.totalRate);
    sessionStorage.setItem("payment",j.payment);
    sessionStorage.setItem("transactionId",j.transactionId);

    navigate("/MyBookings")
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(vehicleType);
    const rate =
      vehicleType === "2W" ? location.state.rate2W : location.state.rate4W;
    console.log(rate);
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("You are offline....Failed to load");
      return;
    }

    const options = {
      key: "rzp_test_sCjJBApxBCT6nJ",
      currency: "INR",
      amount: rate*duration * 100,
      name: name,
      handler: function (response) {
       
        
        booking(response.razorpay_payment_id);
      },
   
      prefill: {
        name: name,
      },
      
      // if(){}
    };
    const paymentObject = new window.Razorpay(options);
     paymentObject.open();
    console.log(`Time: ${time}`);
   
    
  };

  return (
    <div
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        maxHeight: "100vh",
        height: "100vh",
        overflowY: "hidden",
        width: "auto",

        padding: "80px 0px 30px 60px",
      }}
    >
      <div
        className="container"
        style={{
          width: "14cm",
          height: "13cm",
          backgroundColor: "whitesmoke",
          opacity: "0.7",
          padding: "40px",
          border: "groove",
          borderColor: "#1f1f2e",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ fontWeight: "bold", fontSize: "25px" }}
        >
          <div style={{ paddingBottom: "9px" }}>
            <label>
              Name
              <input
                type="text"
                name="name"
                value={name}
                style={{ marginLeft: "41px" }}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>

          <div style={{ paddingBottom: "9px" }}>
            <label>
              Phone
              <input
                type="tel"
                name="phone"
                value={phone}
                style={{ marginLeft: "37px" }}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </label>
          </div>

          <div style={{ paddingBottom: "9px" }}>
            <label>
              Reg No
              <input
                type="text"
                name="license"
                value={license}
                style={{ marginLeft: "23px" }}
                onChange={(e) => setLicense(e.target.value)}
                required
              />
            </label>
          </div>

          <div style={{ paddingBottom: "9px" }}>
            <label>
              Time
              <input
                type="time"
                name="time"
                value={time}
                style={{ width: "7.75cm", marginLeft: "52px" }}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </label>
          </div>
          <div style={{ paddingBottom: "9px" }}>
            <label>
              Duration
              <input
                type="number"
                name="duration"
                value={duration}
                style={{ marginLeft: "5px" }}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </label>
          </div>

          <div style={{ paddingBottom: "9px" }}>
            <label>Vehicle Type:</label> <br />
            {location.state.slots2W !== null ? (
              <>
                <input
                  type="radio"
                  id="W2"
                  name="vehicleType"
                  value="2W"
                  onChange={(e) => setVehicleType(e.target.value)}
                />
                <label htmlFor="W2" style={{ fontWeight: "normal" }}>
                  2W
                </label>
              </>
            ) : (
              <></>
            )}
            <br />
            {location.state.slots4W !== null ? (
              <>
                <input
                  type="radio"
                  id="W4"
                  name="vehicleType"
                  value="4W"
                  onChange={(e) => setVehicleType(e.target.value)}
                />
                <label htmlFor="W4" style={{ fontWeight: "normal" }}>
                  4W
                </label>
              </>
            ) : (
              <></>
            )}
          </div>

          <div className="d-flex justify-content-center">
            <button
              className="btn btn-primary"
              type="submit"
              style={{ marginTop: "20px" }}
            >
              Book
            </button>
            <Link to="/MainBody">
              <button
                className="btn btn-primary"
                type="submit"
                style={{ marginTop: "20px", marginLeft: "10px" }}
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingSystem;
