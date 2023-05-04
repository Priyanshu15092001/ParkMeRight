import "./App.css";
import Login from "./components/Login";
import Signin from "./components/Signin";
import Admin from "./components/Admin";
import Navbar from "./components/Navbar";
import BookingSystem from "./components/BookingSystem";
import SearchParking from "./components/SearchParking";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import MainBody from "./components/MainBody";
import AdminHome from "./components/AdminHome";
import AdminCustomer from "./components/AdminCustomer";


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

      </Routes>
      
    </Router>
     

      {/* <Signin></Signin> */}
      {/* <Admin></Admin> */}
      {/* <Navbar></Navbar> */}
    </>
  );
}

export default App;
