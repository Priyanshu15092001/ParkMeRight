import React, { useEffect, useState } from 'react'
import ParkingBookingItem from "./PreviousBookingItem"
import { useNavigate } from 'react-router-dom';

export default function PreviousBookings() {
  const[data,setData]=useState([]);
  
  const fetchData = async () => {
    // setloading(true)
    let response = await fetch("http://localhost:5000/api/parkingbooking/customer/fetchbooking", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
 
      headers: {
        "Content-Type": "application/json",
        "auth-cust": localStorage.getItem("token"),
      },
    });
    let parseData = await response.json();
    // setloading(false);
    console.log(parseData);
    setData(parseData);
  };
  const navigate=useNavigate()
  useEffect(() => {
    Date.now()
      if(localStorage.getItem("token"))
      fetchData();
      else
     { navigate("/");}
    }, []);
  return (
    <div style={{backgroundColor:'#6387A6',height:'100vh',overflow:'auto'}}>
    <div className='container' style={{paddingTop:'2cm',}}>
  <div className="row">
    { data.success===false?<><h5>No Bookings Yet</h5></>:
    data.map((element) => {
      return (
              <div className="col-md-4" key={element._id}>
              
                <ParkingBookingItem
                
                  _id={element._id}
                  customer={element.customer}
                  location={element.location}
                  vehicle={element.vehicle}
                  startTime={element.startTime}
                  duration={element.duration}
                  totalRate={element.totalRate}
                  payment={element.payment}
                  timestamp={element.timestamp}
transactionId={element.transactionId}

                //   fetchData={fetchData}
                />
              
              </div>
            );
          })}
          </div>
</div>
</div>
  )
}
