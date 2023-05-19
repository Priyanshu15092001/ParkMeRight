import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../Profile.css"
export default function Profile() {
    
    const navigate=useNavigate()
const[data,setData]=useState({name:"",email:"",phone:0,id:""})
const handleSubmit=(e)=>{
  e.preventDefault();
  editCust(data.name,data.phone,data.id);

}
const editCust = async (name,phone,id) => {
  const response = await fetch(`http://localhost:5000/api/auth/updatecust/${id}`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.

    headers: {
      "Content-Type": "application/json",
      "auth-cust": localStorage.getItem("token"),
    },
    body: JSON.stringify({ name,phone }),
  });
  const json = await response.json();
  console.log(json);

  // let newCust = JSON.parse(JSON.stringify(json));
  // console.log(newCust);
  setData({name:json.name,email:json.email,phone:json.phone,id:json._id});
};
const onChange=(e)=>{
  setData({...data,[e.target.name]:e.target.value})
}

    const fetchData=async()=>{
      const response=await fetch("http://localhost:5000/api/auth/getcust",{
      method: "GET", // *GET, POST, PUT, DELETE, etc.
 
      headers: {
        "Content-Type": "application/json",
        "auth-cust": localStorage.getItem("token")
      }})
      const json=await response.json()
setData({id:json._id,name:json.name,email:json.email,phone:json.phone})
    } 

  useEffect(() => {
      if(!localStorage.getItem("token"))
     { navigate("/");}
     fetchData();
     console.log(data)
    }, []);
  
    return (
      <div className="user" style={{backgroundColor:"	#6387A6",height:'100vh'}}>
      <h1 style={{color:"#00e673", textAlign:"center"}}>Hey There!</h1>
      <div className="card1 mb-3" style={{}}>
      <div className="row g-0">
        <div className="col-md-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , border: '2px solid blue', backgroundColor:"#ffd633",margin:'30px auto',padding:'20px' }}>
          <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000" className="img-fluid rounded-start" alt="..."/>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title" style={{textAlign:"center", color:"#ffd633"}}>Your Profile</h5>
            <form>
  
    <div className="mb-3" style={{border: '2px solid blue', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <label htmlFor="name" className="form-label"></label>
      <input type="text" id="name" name='name' className="form-control" value={data.name} onChange={onChange} placeholder="Enter Your Name"/>
    </div>
    <div className="mb-3" style={{border: '2px solid blue', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <label htmlFor="email" className="form-label"></label>
      <input type="text" id="email" name='email' className="form-control" value={data.email} onChange={onChange} placeholder="Address" disabled/>
    </div>
    <div className="mb-3" style={{border: '2px solid blue', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <label htmlFor="phone" className="form-label"></label>
      <input type="text" id="phone" name='phone' className="form-control" value={data.phone} onChange={onChange} placeholder="Phone Number"/>
    </div>
    <button type="submit" className="btn btn1 btn-dark" style={{border:'3px solid blue', backgroundColor:"black"}} onClick={handleSubmit}>Edit</button>
  
</form>

          </div>
        </div>
      </div>
    </div>
    </div>
    );
  
}
