import React from 'react'

export default function AdminVehicleItem(props) {
  return (
    <>
          <th scope="row">{props.hash}</th>
      <td>{props._id}</td>
      <td>{props.customer}</td>
      <td>{props.registrationNo}</td>
      <td>{props.vehicleType}</td>
    </>
  )
}
