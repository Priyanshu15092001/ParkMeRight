import React from "react";

export default function AdminRateItem(props) {
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
  return (
    <>
      <th scope="row">{props.hash}</th>
      <td>{props._id}</td>
      <td>{props.location}</td>
      <td>{props.rate}</td>
      <td>{props.vehicleType}</td>
      {/* <td>
        <i className="fa-solid fa-trash mx-2" onClick={()=>deleteCust(props._id)}></i>
      </td> */}
    </>
  );
}
