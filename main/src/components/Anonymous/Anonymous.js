import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import { motion } from "framer-motion";
import Complaintview from "../Display/Complaintview";
import toast from "react-hot-toast";

const SearchBar = () => {
  const [firId, setFirId] = useState("");
  const [complaintDetails, setComplaintDetails] = useState("");

  const searchHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `https://efir-ecru.vercel.app/api/v1/complaints/fetchComplaint/${firId}?`
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
    console.log(firId);
  };

  const animationVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col justify-start bg-gradient-to-b from-orange-200 via-sky-100 to-green-200 min-h-[92vh] items-center gap-5 py-5 p-3 w-full"
    >
      <motion.form
        onSubmit={searchHandler}
        variants={animationVariants}
        className="rounded-full flex items-center w-full max-w-[600px]"
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
      </motion.form>
      {complaintDetails ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={animationVariants}
          className="w-full bg-white rounded-xl bg-opacity-75"
        >
          <Complaintview
            complaintDetails={complaintDetails}
            setComplaintDetails={setComplaintDetails}
            myComplaints={true}
          />
        </motion.div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={animationVariants}
          className="font-poppins font-bold"
        >
          Search the fir...
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchBar;
