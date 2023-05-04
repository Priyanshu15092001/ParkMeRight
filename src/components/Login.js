import React, { useState } from "react";
import img from "../images/parkingLot.jpg";
import { useNavigate } from "react-router-dom";
const host = "http://localhost:5000";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [err, seterr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json.token);
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem("token", json.token);
      //  props.showAlert("Logged In succesfully","success")

      navigate("/MainBody");
    } else {
      // props.showAlert("Invalid credentials","danger")

      seterr(json.message);
      setTimeout(() => {
        seterr("");
      }, 3000);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
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
      {/* <button type="button" className="btn btn-outline-info" style={{marginTop:'-3.63cm',marginLeft:'36cm',width:'2cm'}}>Admin</button>
        <button type="button" className="btn btn-outline-info" style={{marginTop:'-4.89cm',marginLeft:'38.5cm',width:'2cm'}}>SignIn</button> */}
      <div className="container" style={{ marginLeft: "-200px" }}>
        <div
          className="container"
          style={{
            borderStyle: "none",
            height: "10cm",
            width: "12cm",
            paddingTop: "3cm",
          }}
        >
          <h5
            style={{ color: "whitesmoke", marginLeft: "2.5cm", opacity: "0.8" }}
          >
            Login
          </h5>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-sm-8">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  htmlFor="email"
                  name="email"
                  value={credentials.email}
                  onChange={onChange}
                  placeholder="Email id"
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
                  htmlFor="password"
                  name="password"
                  onChange={onChange}
                  value={credentials.password}
                  placeholder="Enter Password"
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
                  display: "inline-block",
                }}
                type="submit"
                value="Login"
              ></input>
            </div>
          </form>
          <div>
            <h6 style={{ color: "red", padding: "2px" }}>{err}</h6>
            <h6
              style={{ color: "whitesmoke", opacity: "0.8", marginLeft: "3px" }}
            >
              Forgot Password?
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
