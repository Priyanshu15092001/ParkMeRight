import React from 'react'

export default function AdminBookingItem(props) {
    console.log(props.payment)
  return (
    <>
    <th scope="row">{props.hash}</th>
<td>{props._id}</td>
<td>{props.customer}</td>
<td>{props.location}</td>
<td>{props.vehicle}</td>
<td>{props.startTime}</td>
<td>{props.duration}</td>
<td>{props.totalRate}</td>
<td>{props.payment.toString()}</td>
<td>{props.timestamp}</td>

</>
  )
}
