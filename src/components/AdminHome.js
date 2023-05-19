import {useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
 
//  import "../ContanctUs.css"
 
const AdminHome = () => {
   const navigate=useNavigate()
   const[data,setData] = useState([])
   const[data1,setData1] = useState([])
   const[data2,setData2] = useState([])
 
 
   useEffect(() => {
    window.addEventListener('popstate', (e) => {
      window.history.go(1);
    });
    if(!localStorage.getItem("adtoken"))
     { navigate("/");}
      // getData();
   },)
    
 
    return (
      <div className='pic'>
        <h1 style={{textAlign:"center"}}>Welcome to Admin Dashboard!</h1>
    <div className="row row-cols-1 row-cols-md-3 g-4">
  <div className="col1">
    <div className="card m h-100">
      <img src="https://thumbs.dreamstime.com/b/queue-icon-vector-isolated-white-background-queue-transparent-sign-thin-line-design-elements-outline-style-queue-icon-vector-134169197.jpg" className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">No. of Visitors</h5>
        <h1 className="card-text" style={{color:"#99003d"}}>234</h1>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card m h-100">
      <img src="https://png.pngtree.com/png-vector/20220527/ourmid/pngtree-map-pin-icon-point-marker-png-image_4748925.png" className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">No. of Locations</h5>
        <h1 className="card-text"style={{color:"#99003d"}}>2,34,000</h1>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card m h-100">
      <img src="https://static.vecteezy.com/system/resources/previews/015/899/948/original/car-parking-icon-outline-style-vector.jpg" className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">No. of Reservations</h5>
        <h1 className="card-text"style={{color:"#99003d"}}>234</h1>
      </div>
    </div>
  </div>
</div>
    </div>
    )
}
 
export default AdminHome;