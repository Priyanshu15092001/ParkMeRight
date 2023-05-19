import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function PreviousBookingItem(props) {
  const [data,setData]=useState({})
   useEffect(()=>{
    fetchLocation()
   })


   const fetchLocation=async()=>{
    let response = await fetch(`http://localhost:5000/api/location/getlocationid/${props.location}`, {
      method:'GET'
   });
   const json=await response.json();
  //  console.log(json)
   setData(json)
  }
  return (
    <div className="my-3">
    <div className="card" style={{width:'20rem',backgroundColor:'#173F73',color:'white'}}>
    <div className="card-body">
    <h5 className="card-title"  style={{textAlign:'center'}}> {data.name}</h5>
    <p className="card-text"><strong>BookingId:</strong> {props._id}</p>
    <p className='card-text'><strong>Check In:</strong> {props.startTime}</p>
    <p className='card-text'><strong>Duration:</strong> {props.duration}</p>
    {/* <p className='card-text'><strong>Vehicle:</strong> {props.vehicleType}</p> */}
    
    <p className='card-text'><strong>Amount:</strong> {props.totalRate}</p>
    <p className='card-text'><strong>Transaction Id:</strong> {props.transactionId}</p>
    
    <p className='card-text'><strong>Status:</strong>{props.payment===true?" Confirmed":" Refunded"}</p>
    
    </div>
    </div>
    </div>
  )
}
