import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import Complaintview from "../Display/Complaintview";
import toast from "react-hot-toast";

const SearchBar = () => {
  const [firId, setFirId] = useState("");
  const [complaintDetails, setComplaintDetails] = useState("");
  const searchHandler = (e) => {
    e.preventDefault();
    const fetch = async () => {
      try {
        const result = await axios.post(
          `http://localhost:5000/api/v1/complaints/fetchComplaint/${firId}?`
        );
        console.log(result);

        if (result) {
          setComplaintDetails(result.data.fir[0]);
        } else {
          toast.error("Fir Not Found.");
          setComplaintDetails("");
        }
      } catch (err) {
        setComplaintDetails("");
        toast.error("Fir Not Found.");
      }
    };
    fetch();
    console.log(firId);
  };

  return (
    <div className="flex flex-col justify-start bg-gradient-to-b from-orange-200 via-sky-100 to-green-200 min-h-[92vh] items-center gap-5 py-5 p-3 w-full">
      <form
        onSubmit={searchHandler}
        className=" rounded-full flex items-center w-full max-w-[600px]"
      >
        <input
          type="text"
          placeholder="Search..."
          value={firId}
          className="py-2 px-4 w-full focus:outline-none rounded-full"
          onChange={(e) => {
            setFirId(e.target.value);
          }}
        />
        <button className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-full text-2xl ml-2">
          <FiSearch />
        </button>
      </form>
      {complaintDetails ? (
        <div className="w-full">
          <Complaintview
            complaintDetails={complaintDetails}
            setComplaintDetails={setComplaintDetails}
            myComplaints={true}
          />
        </div>
      ) : (
        <div className="font-poppins font-bold">Search the fir...</div>
      )}
    </div>
  );
};

export default SearchBar;
