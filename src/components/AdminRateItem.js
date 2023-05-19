import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminRateItem(props) {
  const[data, setData]=useState({})
//   const deleteCust=async(id)=>{
//     let response = await fetch(`http://localhost:5000/api/auth/deletecust/${id}`, {
//       method: "DELETE", // *GET, POST, PUT, DELETE, etc.

//       headers: {
//         "Content-Type": "application/json",
//         "auth-token": localStorage.getItem("adtoken"),
//       },
//     });
//     props.fetchData()
//     let parseData = await response.json();
//     // setloading(false);
//     console.log(parseData);
    
//   }
const navigate=useNavigate()
useEffect(() => {
  if(!localStorage.getItem("adtoken"))
  { navigate("/");}
   fetchLocation(props.id);
 }, []); 

const fetchLocation=async(id)=>{
  let response = await fetch(`http://localhost:5000/api/location/getlocationid/${id}`, {
    method:'GET'
 });
 const json=await response.json();
//  console.log(json)
 setData(json)
}
  return (
    <>
      <th scope="row">{props.hash}</th>
      
      <td>{data.name}</td>
      <td>{props.rate}</td>
      <td>{props.vehicleType}</td>
      {/* <td>
        <i className="fa-solid fa-trash mx-2" onClick={()=>deleteCust(props._id)}></i>
      </td> */}
    </>
  );
}
