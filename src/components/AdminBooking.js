import React, { useEffect, useState } from 'react'
import AdminBookingItem from './AdminBookingItem';
import { useNavigate } from 'react-router-dom';

export default function AdminBooking() {
const navigate=useNavigate()
    var num=1;
    const [data, setData] = useState([]);
   

    
    useEffect(() => {
      if(!localStorage.getItem("adtoken"))
     { navigate("/");}
      fetchData();
    }, []);
   
    const fetchData = async () => {
      // setloading(true)
      let response = await fetch("http://localhost:5000/api/parkingbooking/fetchbooking", {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
   
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("adtoken"),
        },
      });
      let parseData = await response.json();
      // setloading(false);
      console.log(parseData);
      setData(parseData);
    };

  return (
    <div className='pic' style={{height:'100vh',maxHeight:'100vh',paddingTop:'3cm',paddingRight:'2cm'}}>
    

    <div className="container" >
    <h3 >Total Bookings:{data.length}</h3>
      <table className=" table table-striped table-hover  " style={{color:"black"}}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">Customer</th>
            <th scope="col">Location</th>
            <th scope="col">Vehicle</th>
            <th scope="col">StartTime</th>

            <th scope="col">Duration</th>
            <th scope="col">TotalRate</th>
            <th scope="col">Payment</th>
            <th scope="col">Timestamp</th>

          </tr>
        </thead>
        <tbody>
          {data.map((element) => {
            return (
              <tr key={element._id}>
                <AdminBookingItem
                  hash={num++}
                  _id={element._id}
                  customer={element.customer}
                  location={element.location}
                  vehicle={element.vehicle}
                  startTime={element.startTime}
                  duration={element.duration}
                  totalRate={element.totalRate}
                  payment={element.payment}
                  timestamp={element.timestamp}


                //   fetchData={fetchData}
                />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </div>
  )
}
