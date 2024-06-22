import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserView = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/users/getUserById/${id}`)
        .then((res) => {
          console.log(res.data);
          setLoading(false);
          if (res.data.error) {
            setErrorMsg(res.data.message);
          } else {
            setData({
              firstName: res.data.data[0].first_name,
              lastName: res.data.data[0].last_name,
              email: res.data.data[0].email,
              contactNumber: res.data.data[0].contact_number,
              location: res.data.data[0].location,
              status: res.data.data[0].status,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>Error: {errorMsg}</p>
      <h2 className="text-center">User View</h2>
      <div className="card">
        <p>
          Name: {data?.firstName} {data?.lastName}
        </p>
        <p>Email: {data?.email}</p>
        <p>Contact Number: {data?.contactNumber}</p>
        <p>Location: {data?.location}</p>
        <p>Status: {data?.status}</p>
      </div>
    </div>
  );
};

export default UserView;
