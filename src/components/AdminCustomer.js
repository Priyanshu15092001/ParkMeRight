import React, { useEffect, useState } from "react";
import AdminCustomerItem from "./AdminCustomerItem";
import '../style.css'
function AdminCustomer() {
  var num=1;
  const [data, setData] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

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
  };

  return (
    <div  style={{height:'100vh',maxHeight:'100vh',paddingTop:'3cm'}}>
    

    <div className="container my-10" >
    <h3 >Total Customer:{data.length}</h3>
      <table className=" table table-striped table-hover  " style={{backgroundColor:'#80daeb ',color:"black"}}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody>
          {data.map((element) => {
            return (
              <tr key={element._id}>
                <AdminCustomerItem
                  hash={num++}
                  _id={element._id}
                  name={element.name}
                  email={element.email}
                  phone={element.phone}
                  fetchData={fetchData}
                />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default AdminCustomer;
