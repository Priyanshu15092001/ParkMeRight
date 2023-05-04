import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";
import AdminCustomerItem from "./AdminCustomerItem";

function AdminCustomer() {
  var num=1;
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);

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
    <div  style={{height:'100vh',maxHeight:'100vh',paddingTop:'3cm',backgroundColor:' #80daeb '}}>
    

    <div className="container my-10" style={{backgroundColor:' #80daeb '}}>
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
