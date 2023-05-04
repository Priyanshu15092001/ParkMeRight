import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../images/parkingLot.jpg";

export default function Signin(props) {
  const navigate=useNavigate()
const host = "http://localhost:5000";
const [err, seterr] = useState("")
 
  const [cust, setCust] = useState({
    name: "",
    phone:"",
    email: "",
    password: "",
  });
  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/signup`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
  
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({name:cust.name,phone:cust.phone,email:cust.email,password:cust.password})
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem('token',json.authToken);
  //  props.showAlert("Logged In succesfully","success")
  
     navigate('/MainBody')
    }
    else
    {
      // props.showAlert("Invalid cust","danger")
     
  
      
      seterr(json.message)
        setTimeout(() => {
            seterr("");
        }, 3000);
    
      
    }
  };
  const onChange = (e) => {
    setCust({ ...cust, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        maxHeight: "100vh",
        height: "93vh",
        overflowY: "hidden",
        width: "auto",
        paddingTop: "2cm",
      }}
    >
      <div className="container" style={{ marginLeft: "-200px" }}>
        <div
          className="container"
          style={{
            borderStyle: "none",
            height: "10cm",
            width: "12cm",
            paddingTop: "1.7cm",
          }}
        >
          <h5
            style={{ color: "whitesmoke", marginLeft: "2.5cm", opacity: "0.8" }}
          >
            Sign Up
          </h5>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={cust.name}
                  placeholder="Enter your Name"
                  onChange={onChange}
                  style={{
                    backgroundColor: "	 #33334d",
                    opacity: "0.7",
                    color: "white",
                  }}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-sm-8">
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  minLength={10}
                  maxLength={10}
                  onChange={onChange}
                  placeholder="Enter Phone No."
                  value={cust.phone}
                  style={{
                    backgroundColor: "	 #33334d",
                    opacity: "0.7",
                    color: "white",
                  }}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-8">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={cust.email}
                  onChange={onChange}
                  placeholder="Enter Email id"
                  style={{
                    backgroundColor: "	 #33334d",
                    opacity: "0.7",
                    color: "white",
                  }}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-8">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={cust.password}
                  onChange={onChange}
                  placeholder="Enter new Password"
                  style={{
                    backgroundColor: "	 #33334d",
                    opacity: "0.7",
                    color: "white",
                  }}
                />
              </div>
            </div>

            <div>
              
                <input
                  className="btn  "
                  style={{
                    backgroundColor: "#33334d",
                    color: "whitesmoke",
                    opacity: "0.6",
                  }}
                  type="submit"
                  value="Sign Up"
                ></input>
          
            </div>
          </form>
          <div>
            <h6 style={{color:"red",padding:"2px"}}>{err}</h6>
          </div>
          <Link className="nav-link" to="/Login">
            <h6
              style={{ color: "whitesmoke", opacity: "0.8", marginLeft: "3px" }}
            >
              Already have an existing account?
            </h6>
          </Link>
        </div>
      </div>
    </div>
  );
}
