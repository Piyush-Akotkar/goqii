import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsEyeFill, BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import AlertBox from "./alert/AlertBox";

const UserList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const [alertStatus, setAlertStatus] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/users/getUsers`)
        .then((res) => {
          setLoading(false);
          if (res.data.error) {
            setAlert(true);
            setAlertMsg(res.data.message);
            setAlertStatus("error")
          } else {
            setData(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  // Handle Delete
  const deleteUser = (id) => {
    setAlert(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/deleteUser/${id}`)
      .then((res) => {
        if (res.data.error) {
          setAlertStatus("error");
          setAlertMsg(res.data.message)
        } else {
          setAlertStatus("success");
          setAlertMsg(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert(false);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {alert && (
        <AlertBox status={alertStatus} message={alertMsg} />
      )}
     
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Location</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  <td>{item.contact_number}</td>
                  <td>{item.location}</td>
                  <td>{item.created_at}</td>
                  <td>
                    {item.status === 1 ? (
                      <span
                        style={{
                          border: "1px solid green",
                          color: "green",
                          padding: "2px 6px",
                          borderRadius: "6px",
                        }}
                      >
                        Active
                      </span>
                    ) : (
                      <span
                        style={{
                          border: "1px solid red",
                          color: "red",
                          padding: "2px 6px",
                          borderRadius: "6px",
                        }}
                      >
                        Deactive
                      </span>
                    )}
                  </td>
                  <td>
                    <Link to={`/editUser/${item.id}`} style={{ color: "#333" }}>
                      <button>
                        <BsFillPencilFill />
                      </button>
                    </Link>{" "}
                    <Link to={`/viewUser/${item.id}`}>
                      <button style={{ color: "blue" }}>
                        <BsEyeFill />
                      </button>
                    </Link>{" "}
                    <button
                      style={{ color: "red" }}
                      onClick={() =>  deleteUser(item.id)}
                    >
                      <BsFillTrash3Fill />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
