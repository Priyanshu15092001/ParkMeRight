import React, { useEffect, useState } from 'react'
import AdminLocationItem from './AdminLocationItem';
import "../style.css"

export default function AdminLocation() {

  const host = "http://localhost:5000";
  const [data, setData] = useState({ location:"",address:"",latitude:0,longitude:0,twoWheeler:-1,rate2W:0,fourWheeler:-1,rate4W:0 });
var slot2W=0;
var slot4W=0;
var num=1;

const [locdata, setlocData] = useState([]);

useEffect(() => {
  fetchData();
}, []);


const fetchData = async () => {
  // setloading(true)
  let response = await fetch("http://localhost:5000/api/location/getallloc", {
    method: "GET", // *GET, POST, PUT, DELETE, etc.

    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("adtoken"),
    },
  });
  let parseData = await response.json();
  // setloading(false);
  console.log(parseData);
  setlocData(parseData);
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(data.twoWheeler===-1)slot2W=null
    else slot2W=data.twoWheeler
    if(data.fourWheeler===-1)slot4W=null
    else slot4W=data.fourWheeler

    console.log(data)
    const response1 = await fetch(`${host}/api/location/addlocation`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("adtoken")
      },
      body: JSON.stringify({
      name:data.location,
      address:data.address,
      latitude:data.latitude,
      longitude:data.longitude,
      slots2W:slot2W,
      slots4W:slot4W,
      }),
    });
    const json1 = await response1.json();
    console.log(json1);
    

    if(json1.slots2W!==null){
    const response2 = await fetch(`${host}/api/rate/${json1._id}/addrate`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("adtoken")
      },
      body: JSON.stringify({
    rate:data.rate2W,
    vehicleType:"2W"
      }),
    });
    const json2 = await response2.json();
    console.log(json2);
  }


  if(json1.slots4W!==null){
    const response2 = await fetch(`${host}/api/rate/${json1._id}/addrate`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("adtoken")
      },
      body: JSON.stringify({
      rate:data.rate4W,
      vehicleType:"4W"
      }),
    });
    const json2 = await response2.json();
    console.log(json2);
  }

fetchData()




  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
   
  };




  return (
    <>
    <div className='container ' style={{paddingTop:'2cm'}}>
        <form className="row g-3" onSubmit={handleSubmit}>
  <div className="col-12">
    <label htmlFor="location" className="form-label">Location</label>
    <input type="text" className="form-control" id="location" name='location' htmlFor="location" value={data.location}  onChange={onChange} />
  </div>
  
  <div className="col-12">
    <label htmlFor="address" className="form-label">Address</label>
    <input type="text" className="form-control" id="address" name='address' htmlFor="address" onChange={onChange} value={data.address} placeholder="1234 Main St"/>
  </div>
  <div className="col-md-6">
    <label htmlFor="latitude" className="form-label">Latitude</label>
    <input type="text" className="form-control"   htmlFor="latitude" name='latitude' onChange={onChange} value={data.latitude} id="latitude" />
  </div>
  <div className="col-md-6">
    <label htmlFor="longitude" className="form-label">Longitude</label>
    <input type="text" className="form-control" htmlFor="longitude" name='longitude' onChange={onChange} value={data.longitude} id="longitude"/>
  </div>
  <div className="col-md-2">
    <label htmlFor="twoWheeler" className="form-label">SLots for 2 wheelers</label>
    <input type="number" className="form-control" htmlFor="twoWheeler" name='twoWheeler' onChange={onChange} value={data.twoWheeler} id="twoWheeler"/>
  </div>
  <div className="col-md-2">
    <label htmlFor="rate2w" className="form-label">Rate of two wheelers</label>
    <input type="number" className="form-control" htmlFor="rate2W" name='rate2W' onChange={onChange} value={data.rate2W} id="rate2w"/>
  </div>
  <div className="col-md-2">
    <label htmlFor="fourWheeler" className="form-label">SLots for 4 wheelers</label>
    <input type="number" className="form-control" htmlFor="fourWheeler" name='fourWheeler' onChange={onChange} value={data.fourWheeler} id="fourWheeler"/>
  </div>
  <div className="col-md-2">
    <label htmlFor="rate4w" className="form-label">Rate of four wheelers</label>
    <input type="number" className="form-control" htmlFor="rate4W" name='rate4W' onChange={onChange} value={data.rate4W} id="rate4w"/>
  </div>
  <div className="col-12">
    <button type="submit" className="btn btn-primary">Submit</button>
  </div>
</form>
    </div>



<div className='container my-10' style={{paddingTop:'1cm'}}>
<h3 >Total Locations:{locdata.length}</h3>
      <table className=" table table-striped table-hover  " style={{backgroundColor:'#80daeb ',color:"black"}}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Latitude</th>
            <th scope="col">Longitude</th>
            <th scope="col">2W Slots</th>
            <th scope="col">4W Slots</th>

          </tr>
        </thead>
        <tbody>
          {locdata.map((element) => {
            return (
              <tr key={element._id}>
                <AdminLocationItem
                  hash={num++}
                  _id={element._id}
                  name={element.name}
                  address={element.address}
                  latitude={element.latitude}
                  longitude={element.longitude}
                  slots2W={element.slots2W}
                  slots4W={element.slots4W}
                  fetchData={fetchData}
                />
              </tr>
            );
          })}
        </tbody>
      </table>
</div>
</>
  )
}
