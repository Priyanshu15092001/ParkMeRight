import React, { useEffect, useState } from 'react'
import AdminRateItem from './AdminRateItem';
import { useNavigate } from 'react-router-dom';
function AdminRate() {
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
   let response = await fetch("http://localhost:5000/api/rate/fetchallrate", {
     method: "GET", // *GET, POST, PUT, DELETE, etc.

     headers: {
       "Content-Type": "application/json"
     },
   });
   let parseData = await response.json();
   // setloading(false);
  //  console.log(parseData);

   setData(parseData);
 };


  return (
    <div className='pic'>
    

    <div className="container my-10" >
    <h3 >Total Rate:{data.length}</h3>
      <table className=" table table-striped table-hover  " style={{color:"black"}}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Location</th>
            <th scope="col">Rate</th>
            <th scope="col">VehicleType</th>
          </tr>
        </thead>
        <tbody>
          {data.map((element) => {

           

            return (
              <tr key={element._id}>
                <AdminRateItem
                  hash={num++}
                id={element.location}
                
                  rate={element.rate}
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

export default AdminRate