import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import img from "../images/parkingLot.jpg";
export default function Navbar() {
  const navigate=useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem("token");
    
    navigate("/")
    
  }

  const handleAdminLogout=()=>{
    localStorage.removeItem("adtoken");
    
    navigate("/")
  }

  if(localStorage.getItem("adtoken"))
  {console.log(localStorage.getItem("adtoken"))
    return(
    <>
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark" style={{  backgroundColor:' #031859',height:'7vh'}}>
  <div className="container-fluid" >
    <Link className="navbar-brand" >ParkMe Right</Link>
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse"  id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/AdminHome">Home</Link>
        </li>
        <li className="nav-item">
         <Link  className="nav-link active" to="/AdminCustomer">Customers </Link>
        </li>
        
        <li className="nav-item">
          <Link className="nav-link active" to="/AdminLocation">Locations</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/AdminRate">Rates</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/AdminVehicle">Vehicles</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/AdminBooking">Bookings</Link>
        </li>
      </ul>
      <div className="d-flex">
      <button className="btn btn-outline-info" onClick={handleAdminLogout}>Logout</button>
      </div>
    </div>
  </div>
</nav>
    </>
  )}
  else
  return (
   
    <nav
      className="navbar fixed-top navbar-expand-lg navbar-dark "
      style={{  backgroundColor:' #031859',height:'7vh'}}
    >
      <div className="container-fluid">
       <Link className="navbar-brand" >ParkMe Right</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
       
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
       {!localStorage.getItem("token")?<>

       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
          <Link className="nav-link active" to="/About">About us</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/ContactUs">Contact Us</Link>
        </li>
        </ul>


        <Link className="nav-link" to='/Admin'>
       
          <button
            className="btn btn-outline-info "
            type="button"
            style={{ marginRight:'8px' }}
            
          >
            Admin
          </button>
          </Link>
            <Link className="nav-link" to='/Signin'>
          <button
            className="btn btn-outline-info "
            type="button"
            style={{ marginRight:'8px' }}
            
          >
            Sign Up
          </button>
          </Link>
          <Link className="nav-link active" to='/'>
          <button
            className="btn btn-outline-info "
            type="button"
            style={{ marginRight:'8px' }}
            
          >
            Login
          </button>
          </Link></>:<>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
          <Link className="nav-link active" to="/MainBody">Home</Link>
        </li>
        <li className="nav-item">
         <Link  className="nav-link active" to="/Profile">Profile</Link>
        </li>
        
        
        <li className="nav-item">
          <Link className="nav-link active" to="/MyBookings">Current Bookings</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/PreviousBookings">All Bookings</Link>
        </li>
       
      </ul>
          <button className="btn btn-outline-info " onClick={handleLogout}>Logout</button>
         </>}
        </div>
      </div>
    </nav>
  );
}
