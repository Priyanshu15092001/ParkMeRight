import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function MyBookings() {
    const navigate = useNavigate()
    
    // const{loc="",locId="",bookingId="",checkIn="",duration=0,vehicleType="",rate=0,transactionId="",payment=false}=state!==null?state:{};
   
    useEffect(() => {
        if(!localStorage.getItem("token"))
       { navigate("/");}
    
      console.log(sessionStorage.getItem("payment"));
         
    }, [])
   


    const initiateRefund = async () => {
       
        


        const response2=await fetch(`http://localhost:5000/api/parkingbooking/cancelbooking/${sessionStorage.getItem("bookingId")}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-cust':localStorage.getItem("token")
            }
        })
        const json=await response2.json()

        const response3=await fetch(`http://localhost:5000/api/location/updateslots/cancelbooking/${sessionStorage.getItem("locID")}/${sessionStorage.getItem("vehicleType")}`,
        {
            method: 'PUT',
        })
        const json2=await response3.json()
        console.log(json2);
        sessionStorage.setItem("payment",false)
        sessionStorage.clear();
        navigate("/MyBookings")
      };
      
    





  return (
    <div className="" style={{backgroundColor:'#6387A6',height:'100vh'}}>
    <div className='container' style={{paddingTop:'2cm'}}>
        {sessionStorage.getItem("bookingId")?<>
        <div className="col-md-4" >
        <div className="card" style={{width:'20rem',backgroundColor:'#173F73',color:'white'}}>
  <div className="card-body">
    <h5 className="card-title"  style={{textAlign:'center'}}> {sessionStorage.getItem("loc")}</h5>
    <p className="card-text"><strong>BookingId:</strong> {sessionStorage.getItem("bookingId")}</p>
    <p className='card-text'><strong>Check In:</strong> {sessionStorage.getItem("checkIn")}</p>
    <p className='card-text'><strong>Duration:</strong> {sessionStorage.getItem("duration")}</p>
    <p className='card-text'><strong>Vehicle:</strong> {sessionStorage.getItem("vehicleType")}</p>

    <p className='card-text'><strong>Amount:</strong> {sessionStorage.getItem("rate")}</p>
    <p className='card-text'><strong>Transaction Id:</strong> {sessionStorage.getItem("transactionId")}</p>

    <p className='card-text'><strong>Status:</strong>{sessionStorage.getItem("payment")?" Confirmed":" Refunded"}</p>

    <Link href="#" className="btn btn-danger" onClick={initiateRefund}>Cancel Booking</Link>
  </div>
</div>
</div></>:<><h5>No Current Bookings</h5></>}
    </div>
    </div>
  )
}
