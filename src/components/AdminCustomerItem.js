import React from "react";

export default function AdminCustomerItem(props) {
  const deleteCust=async(id)=>{
    let response = await fetch(`http://localhost:5000/api/auth/deletecust/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("adtoken"),
      },
    });
    let parseData = await response.json();
    // setloading(false);
    console.log(parseData);
    
  }
  return (
    <>
      <th scope="row">{props.hash}</th>
      <td>{props._id}</td>
      <td>{props.name}</td>
      <td>{props.email}</td>
      <td>{props.phone}</td>
      <td>
        <i className="fa-solid fa-trash mx-2" onClick={()=>deleteCust(props._id)}></i>
      </td>
    </>
  );
}
