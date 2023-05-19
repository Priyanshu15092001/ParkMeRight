import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AdminVehicleItem(props) {
  const [data,setData]=useState({})
  const navigate=useNavigate();
  useEffect(() => {
    if(!localStorage.getItem("adtoken"))
    { navigate("/");}
     fetchCustomer(props.customer);
   }, []); 
  
  const fetchCustomer=async(id)=>{
    let response = await fetch(`http://localhost:5000/api/auth/getcust/${id}`, {
      method:'GET',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("adtoken"),
      }
   });
   const json=await response.json();
  //  console.log(json)
   setData(json)
  }
  return (
    <>
          <th scope="row">{props.hash}</th>
      <td>{props._id}</td>
      <td>{data.name}</td>
      <td>{props.registrationNo}</td>
      <td>{props.vehicleType}</td>
    </>
  )
}
