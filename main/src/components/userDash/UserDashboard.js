import axios from "axios";
import React, { useEffect, useState } from "react";
import Displaybar from "../Display/Displaybar";

const UserDashboard = ({ currentUser, setFilters }) => {
  const [complaintList, setComplaintList] = useState([]);

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
          setComplaintList({
            complaints: result.data.fir,
          });
        }
      } catch (err) {}
    };
    fetch();
  }, [currentUser]);
  useEffect(() => {
    console.log("Complaint list", complaintList);
  }, [complaintList]);

  return (
    <div className="w-[99%]">
      <Displaybar
        complaints={complaintList}
        setComplaintList={setComplaintList}
        setFilters={setFilters}
        heading={"My Complaints"}
        myComplaints={true}
      />
    </div>
  );
};

export default UserDashboard;
