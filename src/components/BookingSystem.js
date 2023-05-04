import React, { useState } from 'react';
import img from "../images/parkingLot.jpg"
function BookingSystem() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [license, setLicense] = useState("");
  const [duration, setDuration] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Name: ${name}`);
    console.log(`Phone Number: ${phoneNumber}`);
    console.log(`Date: ${date}`);
    console.log(`Time: ${time}`);
  };

  return (
    <div style={{ backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    maxHeight: "100vh",
    height: "93vh",
    overflowY: "hidden",
    width: "auto",
    padding:'60px 0px 30px 60px'}}>
    <div className="container" style={{width:'14cm', height:'13cm',backgroundColor:'whitesmoke',opacity:'0.7',padding:'40px',border:'groove',borderColor:'#1f1f2e'}}>
    <form onSubmit={handleSubmit} style={{fontWeight:'bold',fontSize:'25px'}}>
        <div style={{paddingBottom:'9px'}}>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={name}
          style={{marginLeft:'40px'}}
          onChange={e => setName(e.target.value)}
          required
        />
      </label></div>
      <div style={{paddingBottom:'9px'}}>
      <label>
        Reg No
        <input
          type="text"
          name="license"
          value={license}
          style={{marginLeft:'23px'}}
          onChange={e => setLicense(e.target.value)}
          required
        />
      </label></div>
      <div style={{paddingBottom:'9px'}}>
      <label>
        Phone
        <input
          type="tel"
          name="phoneNumber"
          value={phoneNumber}
          style={{marginLeft:'34.8px'}}
          pattern="[0-9]{10}"
          onChange={e => setPhoneNumber(e.target.value)}
          required
        />
      </label>
      </div>
    <div style={{paddingBottom:'9px'}}>
      <label>
        Date
        <input
          type="date"
          name="date"
          value={date}
          style={{marginLeft:'55px',width:'7.7cm'}}
          onChange={e => setDate(e.target.value)}
          required
        />
      </label>
      </div>

     <div style={{paddingBottom:'9px'}}>
      <label>
        Time
        <input
          type="time"
          name="time"
          value={time}
          style={{width:'7.75cm',marginLeft:'50px'}}
          onChange={e => setTime(e.target.value)}
          required
        />
      </label>
      </div>
      <div style={{paddingBottom:'9px'}}>
      <label>
        Duration
        <input
          type="number"
          name="duration"
          value={duration}
          style={{marginLeft:'5px'}}
        
          onChange={e => setDuration(e.target.value)}
          required
        />
      </label>
      </div>
      <div className='d-flex justify-content-center'>
      <button className="btn btn-primary" type="submit" style={{marginTop:'20px'}}>Book</button>
      </div>
    </form>
    </div>
    </div>
  );
}

export default BookingSystem;
