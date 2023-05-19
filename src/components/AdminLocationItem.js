import React from 'react'

function AdminLocationItem(props) {
  const deleteCust=async(id)=>{
    let response = await fetch(`http://localhost:5000/api/locrate/deletelocrate/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("adtoken"),
      },
    });
    props.fetchData()
    let parseData = await response.json();
    // setloading(false);
    console.log(parseData);
  }



  return (
    
        <>
        
      <th scope="row">{props.hash}</th>
      <td>{props.name}</td>
      <td>{props.address}</td>
      <td>{props.latitude}</td>
      <td>{props.longitude}</td>
      <td>{props.slots2W}</td>
      <td>{props.slots4W}</td>

      <td>
        <i className="fa-solid fa-trash mx-2" onClick={()=>deleteCust(props._id)}></i>
      </td>
      <td>
      <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{props.updateCust(props.element)}}></i>
      </td>
    </>
    
  )
}

export default AdminLocationItem