import React, { Component, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainBodyItem from "./MainBodyItem";
import { Input, Card } from "antd";

//import "../style.css"
export default function MainBody() {
  const [locdata, setlocData] = useState([]);
  const [locdata1, setlocData1] = useState([]);

  const [ratedata, setrateData] = useState([]);
  const [locMatch, setlocMatch] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener('popstate', (e) => {
      window.history.go(1);
    });
    if(!localStorage.getItem("token"))
    navigate("/");
    fetchData();
  },[]);

  window.onbeforeunload = function() {
    localStorage.clear();
  
 }
const displayLoc=async(item)=>{
  console.log(item)
  let response = await fetch(`http://localhost:5000/api/location/getlocation/${item}`, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.

    headers: {
      "Content-Type": "application/json",
    },
  

    }
  );
  let parseData = await response.json();
  // setloading(false);
  console.log(parseData);
  setlocData1(parseData);
searchLoc(null);


}



  const fetchData = async () => {
    // setloading(true)
    let response = await fetch("http://localhost:5000/api/location/getallloc", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
      },
    });
    let parseData = await response.json();
    // setloading(false);
    console.log(parseData);
    setlocData(parseData);
    setlocData1(parseData)
    let response1 = await fetch("http://localhost:5000/api/rate/fetchallrate", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
      },
    });
    let parseData1 = await response1.json();
    // setloading(false);
    console.log(parseData1);
    setrateData(parseData1);
  };

  const searchLoc = (text) => {
    if (!text) {
      setlocMatch([]);
      // setlocData1(locdata);
    } else {
      let matches = locdata.filter((loc) => {
        const regex = new RegExp(`${text}`, "gi");
        return loc.name.match(regex) || loc.address.match(regex);
      });
      setlocMatch(matches);
    }
  };

  return (
    <div className="" style={{ width: "100%", backgroundColor:'	#6387A6' ,height:'100vh',overflow:'auto'}}>
      <div
        className=""
        style={{
          zIndex: "1",
          position: "fixed",
          height: "2cm",
          width: "100%",
          backgroundColor: "#1f1f2e",
          paddingLeft: "10cm",
          top: "-24px",
          marginTop: "2cm",
          paddingTop: "20px",
        }}
      >
        {/* <form className="d-flex " role="search" style={{}}> */}
          <Input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => searchLoc(e.target.value)}
            style={{ width: "40%", marginTop: "5px" }}
          />
          {locMatch &&
            locMatch.map((item, index) => (
              <div key={index} onClick={()=>displayLoc(item.name)} style={{ border:'groove',width:'40%',backgroundColor:'white',height:'1.3cm' ,whiteSpace:'nowrap' }}>
                {/* <Card style={{ width: "40%" ,zIndex:'1',height:'1cm'}} title={item.name}>
                  Address:{item.address}
                </Card> */}
                <div className="" style={{height:'1.3cm',zIndex:'1',width:'40%'}}>
                  <p style={{fontSize:'0.79rem', display:'inline-block'}}><strong style={{fontSize:'0.8rem'}}>{item.name}</strong>
                  <br/>
                 <strong> Address:</strong> {item.address}</p>
                 
                </div>
              </div>
            ))}   

            
          {/* <Link className="nav-link" to="/SearchParking">
            <button className="btn btn-outline-danger " type="submit">
              Search
            </button>
          </Link>
        </form> */}
      </div>
      <div className="container" style={{ zIndex: "0" }}>
        <div
          className=" row"
          style={{
            marginTop: "2cm",
            paddingLeft: "3cm",
            paddingTop: "3cm",
          }}
        >
          {locdata1.map((element) => {
           const rate1= ratedata.find((e) => e.location === element._id && e.vehicleType==='2W')
           const rate2= ratedata.find((e) => e.location === element._id && e.vehicleType==='4W')
        let r1=0;let r2=0;
        if(rate1){r1=rate1.rate};
        if(rate2){r2=rate2.rate};
        // console.log(r1)
        // console.log(r2)
            return (
              <div className="col-md-4" key={element._id}>
                <MainBodyItem
                  _id={element._id}
                  name={element.name}
                  address={element.address}
                  slots2W={element.slots2W}
                  slots4W={element.slots4W}
                  rate2W={r1}
                  rate4W={r2}
                  fetchData={fetchData}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
