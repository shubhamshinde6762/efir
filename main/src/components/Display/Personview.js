import React, { useState, useRef, useEffect } from "react";
import { MdArrowBack } from "react-icons/md";

const Personview = ({ addPersonFlag,setAddPersonFlag, personDetails, setPersonDetails }) => {
  
 

//   useEffect(() => {
//     if (personDetailsFromMainForm !== "")
//       setPersonDetails(() => ({
//         ...personDetailsFromMainForm,
//         aadhar: personDetailsFromMainForm.aadhar
//           .toString()
//           .split("")
//           .map(Number),
//       }));
//   }, []);

  const aadharInputs = useRef([]);
  useEffect(() => {
    console.log("Current person :", personDetails);
  }, [personDetails]); //

  return (
    <div className="w-full">
      {personDetails && (
        <div className="fixed top-0 z-20 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-30">
          <div className="bg-white relative w-3/4 xs:w-5/6 p-4 xs:p-1 items-center flex-col justify-evenly text-black min-w-[250px]   rounded-xl shadow">
            <MdArrowBack
              onClick={() => {
                setAddPersonFlag("") ;setPersonDetails("")}}
                
              className="absolute -left-2 -top-2 cursor-pointer hover:bg-red-700 transition-all duration-300 hover:scale-105 text-white text-3xl rounded-full p-1 bg-red-500"
            />

            <div className="justify-evenly gap-2 p-3 my-4 relative border-2 border-violet-500  flex flex-col rounded-2xl mx-auto">
              <div className="absolute font-bold font-poppins bg-white px-2 text-xl -top-4 left-2 rounded-md">
                {addPersonFlag === "VictimArray"
                  ? "Victim Information"
                  : addPersonFlag === "AccusedArray"
                  ? " Accused Information"
                  : " Witness Information"}
              </div>
              <div className="flex flex-col gap-1 justify-start items-start w-full">
                <label className=" font-bold ">Name</label> 
                <input disabled
                  type="text"
                  name="name"
                  value={personDetails && personDetails.name}
                  
                  placeholder="Name"
                  className="shadow rounded-lg px-3 py-1 w-full max-w-[400px]  "
                />
              </div>
              <div className="flex flex-row gap-4 xs:flex-wrap max-w-[3/4]">
                <div className="flex flex-col gap-1 min-w-0 w-full ">
                  <label className="  font-bold">Age:</label>
                  <input disabled
                    type="text"
                    name="age"
                    value={personDetails && personDetails.age}
                    
                    placeholder="Age"
                    className="shadow rounded-lg px-3 py-1  "
                  />
                </div>

                <div className="flex flex-col gap-1 min-w-0 w-full">
                  <label className=" text-[1rem] font-bold">Occupation:</label>
                  <input disabled
                    type="text"
                    name="occupation"
                    value={personDetails && personDetails.occupation}
                    
                    placeholder="Occupation"
                    className="shadow rounded-lg px-3 py-1 "
                  />
                </div>
                <div className="flex flex-col gap-1 min-w-0 w-full">
                  <label className="text-[1rem] font-bold">
                    Contact Number:
                  </label>
                  <input disabled
                    type="text"
                    name="contact"
                    value={personDetails.contact}
                    placeholder="Contact Number"
                    className="shadow rounded-lg px-3 py-1"
                  />
                </div>
              </div>
              <label className="font-bold">Address:</label>
              <textarea disabled
                type="text"
                name="address"
                value={personDetails && personDetails.address}
                placeholder="Address..."
                className="shadow rounded-lg px-3 resize-none py-1 "
              />
              <div className="flex-col justify-center w-full">
                <label htmlFor="aadhar" className="font-bold">
                  Aadhar Number:
                </label>
                <div className="flex flex-wrap gap-1 text-sm ">
                {personDetails.aadhar &&
                    
                      <input disabled
                        type="text"
                        value={personDetails && personDetails.aadhar}
                        className=" shadow rounded-lg px-3 py-1"
                      />
}    
                </div>
              </div>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Personview;
