import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AlertBox from "./alert/AlertBox";

const UpdateUser = () => {
  const params = useParams();

  const [btnLoading, setBtnLoading] = useState(null);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const [alertStatus, setAlertStatus] = useState(null);

  const [formdata, setFormdata] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    contactNumber: "",
    location: "",
  });

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/users/getUserById/${params.id}`)
        .then((res) => {
          if (res.data.error) {
            setAlert(true);
            setAlertMsg(res.data.message);
            setAlertStatus("error");
          } else {
            setFormdata({
              firstName: res.data.data[0].first_name
                ? res.data.data[0].first_name
                : "",
              lastName: res.data.data[0].last_name
                ? res.data.data[0].last_name
                : "",
              emailId: res.data.data[0].email ? res.data.data[0].email : "",
              contactNumber: res.data.data[0].contact_number
                ? res.data.data[0].contact_number
                : "",
              location: res.data.data[0].location
                ? res.data.data[0].location
                : "",
            });
          }
        })
        .catch((err) => {
          setAlert(true);
          setAlertMsg(err.response.data.message);
          setAlertStatus("error");
        });
    };
    fetchData();
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnLoading(true);
    setAlert(true);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/users/editUser/${params.id}`,
        formdata
      )
      .then((res) => {
        setBtnLoading(false);
        if (res.data.error) {
          setAlertMsg(res.data.message);
          setAlertStatus("error");
        } else {
          setAlertMsg(res.data.message);
          setAlertStatus("success");
        }
      })
      .catch((err) => {
        setBtnLoading(false);
        setAlertMsg(err.response.data.message);
        setAlertStatus("error");
      });
  };

  return (
    <div>
      {alert && <AlertBox status={alertStatus} message={alertMsg} />}
      <h2 className="text-center">Edit User</h2>
      <div className="card">
        <div className="form-input">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            onChange={handleChange}
            className="form-item"
            value={formdata?.firstName}
          />
        </div>
        <div className="form-input">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            onChange={handleChange}
            className="form-item"
            value={formdata?.lastName}
          />
        </div>
        <div className="form-input">
          <label htmlFor="emailId">Email</label>
          <input
            type="email"
            name="emailId"
            id="emailId"
            autoComplete="true"
            onChange={handleChange}
            className="form-item"
            value={formdata?.emailId}
          />
        </div>
        <div className="form-input">
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            id="contactNumber"
            onChange={handleChange}
            className="form-item"
            value={formdata?.contactNumber}
          />
        </div>
        <div className="form-input">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            onChange={handleChange}
            className="form-item"
            value={formdata?.location}
          />
        </div>
        <div className="form-input">
          {btnLoading ? (
            <button disabled>Please wait...</button>
          ) : (
            <button onClick={handleSubmit}>Submit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
