import React, { useEffect, useState } from 'react'
import AdminVehicleItem from './AdminVehicleItem';
import { useNavigate } from 'react-router-dom';

export default function AdminVehicle() {
    var num=1;
    const [data, setData] = useState([]);
   const navigate=useNavigate()
   
    useEffect(() => {
      if(!localStorage.getItem("adtoken"))
     { navigate("/");}
      fetchData();
    }, []);
   
    const fetchData = async () => {
      // setloading(true)
      let response = await fetch("http://localhost:5000/api/parkingbooking/fetchvehicle", {
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
    
          <div  className='pic'>
    

    <div className="container my-10" >
    <h3 >Total Vehicles:{data.length}</h3>
      <table className=" table table-striped table-hover  " style={{color:"black"}}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">Customer</th>
            <th scope="col">RegistrationNo.</th>
            <th scope="col">VehicleType</th>
          </tr>
        </thead>
        <tbody>
          {data.map((element) => {
            return (
              <tr key={element._id}>
                <AdminVehicleItem
                  hash={num++}
                  _id={element._id}
                  customer={element.customer}
                  registrationNo={element.registrationNo}
                  vehicleType={element.vehicleType}
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
