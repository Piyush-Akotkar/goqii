import axios from "axios";
import React, { useState } from "react";
import AlertBox from "./alert/AlertBox";

const AddUser = () => {
  const [formdata, setFormdata] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    contactNumber: "",
    location: "",
  });
  const [btnLoading, setBtnLoading] = useState(null);

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const [alertStatus, setAlertStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };
  const addUser = (e) => {
    e.preventDefault();
    setBtnLoading(true);
    setAlert(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/addUser`, formdata)
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
      <h2 className="text-center">AddUser</h2>
      <div className="card">
        <div className="form-input">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            onChange={handleChange}
            className="form-item"
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
          />
        </div>
        <div className="form-input">
          {btnLoading ? (
            <button disabled>Please wait...</button>
          ) : (
            <button onClick={addUser}>Submit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddUser;
