import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AdminBookingItem(props) {
    console.log(props.payment)
    const [data,setData]=useState({})
    const [data1,setData1]=useState({})
    const [data2,setData2]=useState({})

    const navigate=useNavigate();
    useEffect(() => {
      if(!localStorage.getItem("adtoken"))
      { navigate("/");}
       fetchCust(props.customer);
       fetchLoc(props.location);
       fetchVeh(props.vehicle);
     }, []); 
    
    const fetchCust=async(custid,locid,vehid)=>{
      let response = await fetch(`http://localhost:5000/api/auth/getcust/${custid}`, {
        method:'GET',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("adtoken"),
        }
     });
     const json=await response.json();
     console.log(json)
     setData(json)

    }
    const fetchLoc=async(locid)=>{
     let response1 = await fetch(`http://localhost:5000/api/location/getlocationid/${locid}`, {
    method:'GET'
 });
 const json1=await response1.json();
//  console.log(json)
 setData1(json1)
    }
    const fetchVeh=async(vehid)=>{
 let response2 = await fetch(`http://localhost:5000/api/parkingbooking/getvehicle/${vehid}`, {
  method:'GET',
  headers: {
    "Content-Type": "application/json",
    "auth-token": localStorage.getItem("adtoken"),
  }
});
const json2=await response2.json();
//  console.log(json)
setData2(json2)



    }
  return (
    <>
    <th scope="row">{props.hash}</th>
<td>{props._id}</td>
<td>{data.name}</td>
<td>{data1.name}</td>
<td>{data2.vehicleType}</td>
<td>{props.startTime}</td>
<td>{props.duration}</td>
<td>{props.totalRate}</td>
<td>{props.payment.toString()}</td>
<td>{props.timestamp}</td>

</>
  )
}
