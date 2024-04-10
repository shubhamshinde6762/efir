import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = ({ currentUser }) => {
  const [complaintList, setComplaintList] = useState([]);
  const navidateIo = useNavigate();

  useEffect(() => {
    try {
      if (!currentUser) navidateIo("/");
    } catch (error) {}
  }, [currentUser]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.post(
          "http://localhost:5000/api/v1/complaints/fetchComplaint",
          {
            userId: currentUser._id,
          }
        );
        console.log(result);

        if (result) {
          setComplaintList(result.fir);
        }
      } catch (err) {}
    };
    fetch();
  }, [currentUser]);

  return <div>My Complaints</div>;
};

export default UserDashboard;
