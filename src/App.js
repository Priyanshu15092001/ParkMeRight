// import "./App.css";
import Login from "./components/Login";
import Signin from "./components/Signin";
import Admin from "./components/Admin";
import Navbar from "./components/Navbar";
import BookingSystem from "./components/BookingSystem";
import SearchParking from "./components/SearchParking";
import MyBookings from "./components/MyBookings";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import MainBody from "./components/MainBody";
import AdminHome from "./components/AdminHome";
import AdminCustomer from "./components/AdminCustomer";
import AdminLocation from "./components/AdminLocation";
import AdminRate from "./components/AdminRate";
import AdminVehicle from "./components/AdminVehicle";
import AdminBooking from "./components/AdminBooking";
import PreviousBookings from "./components/PreviousBookings";
import Profile from "./components/Profile";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
      <Route exact path="/" element={<Login/>}  />
      <Route exact path="/Signin" element={<Signin/>}  />
      <Route exact path="/Admin" element={<Admin/>}  />
      <Route exact path="/SearchParking" element={<SearchParking/>} />
      <Route exact path="/BookingSystem" element={<BookingSystem/>} />
      <Route exact path="/MainBody" element={<MainBody/>}></Route>
      <Route exact path="/AdminHome" element={<AdminHome/>}></Route>
      <Route exact path="/AdminCustomer" element={<AdminCustomer/>}></Route>
      <Route exact path="/AdminLocation" element={<AdminLocation/>}></Route>
      <Route exact path="/AdminRate" element={<AdminRate/>}></Route>
      <Route exact path="/AdminVehicle" element={<AdminVehicle/>}></Route>
      <Route exact path="/AdminBooking" element={<AdminBooking/>}></Route>
      <Route exact path="/MyBookings" element={<MyBookings/>}></Route>
      <Route exact path="/PreviousBookings" element={<PreviousBookings/>}></Route>
      <Route exact path="/Profile" element={<Profile/>}></Route>
      <Route exact path="/About" element={<About/>}></Route>
      <Route exact path="/ContactUs" element={<ContactUs/>}></Route>
      




      </Routes>
      
    </Router>
     

      {/* <Signin></Signin> */}
      {/* <Admin></Admin> */}
      {/* <Navbar></Navbar> */}
    </>
  );
}

export default App;
