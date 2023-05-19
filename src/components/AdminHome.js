import {useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
 
//  import "../ContanctUs.css"
 
const AdminHome = () => {
   const navigate=useNavigate()
   const[data,setData] = useState([])
   const[data1,setData1] = useState([])
   const[data2,setData2] = useState([])
 
   const fetchData = async () => {
    // setloading(true)
    let response = await fetch("http://localhost:5000/api/auth/getallcust", {
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



    let response1 = await fetch("http://localhost:5000/api/location/getallloc", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
  
      headers: {
        "Content-Type": "application/json"
      },
    });
    let parseData1 = await response1.json();
    // setloading(false);
    console.log(parseData1);
    setData1(parseData1);





    let response2 = await fetch("http://localhost:5000/api/parkingbooking/fetchbooking", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
 
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("adtoken"),
      },
    });
    let parseData2 = await response2.json();
    // setloading(false);
    console.log(parseData2);
    setData2(parseData2);

  };
  
   useEffect(() => {
    window.addEventListener('popstate', (e) => {
      window.history.go(1);
    });
    if(!localStorage.getItem("adtoken"))
     { navigate("/");}
      // getData();
      fetchData()
   },)
    
 
    return (
      <div className='pic'>
        <h1 style={{textAlign:"center"}}>Welcome to Admin Dashboard!</h1>
    <div className="row row-cols-1 row-cols-md-3 g-4">
  <div className="col1">
    <div className="card m h-100">
      <img src="https://thumbs.dreamstime.com/b/queue-icon-vector-isolated-white-background-queue-transparent-sign-thin-line-design-elements-outline-style-queue-icon-vector-134169197.jpg" className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">No. of Customers</h5>
        <h1 className="card-text" style={{color:"#99003d"}}>{data.length}</h1>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card m h-100">
      <img src="https://png.pngtree.com/png-vector/20220527/ourmid/pngtree-map-pin-icon-point-marker-png-image_4748925.png" className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">No. of Locations</h5>
        <h1 className="card-text"style={{color:"#99003d"}}>{data1.length}</h1>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card m h-100">
      <img src="https://static.vecteezy.com/system/resources/previews/015/899/948/original/car-parking-icon-outline-style-vector.jpg" className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">No. of Bookings</h5>
        <h1 className="card-text"style={{color:"#99003d"}}>{data2.length}</h1>
      </div>
    </div>
  </div>
</div>
    </div>
    )
}
 
export default AdminHome;