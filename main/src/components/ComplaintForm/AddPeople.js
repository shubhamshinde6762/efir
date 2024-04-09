import React, { useState, useRef, useEffect } from "react";
import { MdArrowBack } from "react-icons/md";

const AddPeople = ({
  addPersonFlag,
  setComplaintDetails,
  setAddPersonFlag,
  complaintDetails,
  setPersonDetailsFromMainForm,
  personDetailsFromMainForm,
}) => {
  const [personDetails, setPersonDetails] = useState({
    name: "",
    age: "",
    address: "",
    contact: "",
    occupation: "",
    aadhar: Array(12).fill(""),
  });
  const [remark, setRemark] = useState("")
  useEffect(() => {
    if (personDetailsFromMainForm !== "")
      setPersonDetails(() => ({
        ...personDetailsFromMainForm,
        aadhar: personDetailsFromMainForm.aadhar
          .toString()
          .split("")
          .map(Number),
      }));
  }, []);

  const aadharInputs = useRef([]);

  const handleAadharChange = (e, index) => {
    const { value, inputType } = e.target;

    if (inputType === "deleteContentBackward" && value === "") {
      if (index > 0) {
        aadharInputs.current[index - 1].focus();
        setPersonDetails((prevDetails) => {
          const newDetails = { ...prevDetails };
          newDetails.aadhar[index - 1] = "";
          return newDetails;
        });
      }
    } else if (!isNaN(value) && value !== "") {
      setPersonDetails((prevDetails) => {
        const newDetails = { ...prevDetails };
        newDetails.aadhar[index] = value;
        return newDetails;
      });
      if (index < 11) {
        aadharInputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "") {
      if (index > 0) {
        aadharInputs.current[index - 1].focus();
        setPersonDetails((prevDetails) => {
          const newDetails = { ...prevDetails };
          newDetails.aadhar[index - 1] = "";
          return newDetails;
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      personDetails.name.trim() === "" &&
      personDetails.age.trim() === "" &&
      personDetails.address.trim() === "" &&
      personDetails.contact.trim() === "" &&
      personDetails.occupation.trim() === "" &&
      personDetails.aadhar.every((digit) => digit === "")
    ) {
      alert("Please fill at least one field before submitting.");
      return;
    }

    const aadharNumber = personDetails.aadhar.join("");

    const updatedDetails = {
      ...personDetails,
      age: personDetails.age !== "" ? parseInt(personDetails.age) : "",
      contact:
        personDetails.contact !== "" ? parseInt(personDetails.contact) : "",
      aadhar: aadharNumber !== "" ? (aadharNumber) : "",
    };

    setComplaintDetails((prevDetails) => {
      const updatedArray = [
        ...prevDetails[addPersonFlag].filter(
          (ele) => ele != personDetailsFromMainForm
        ),
        updatedDetails,
      ];
      setPersonDetailsFromMainForm("");
      return { ...prevDetails, [addPersonFlag]: updatedArray };
    });

    setPersonDetails({
      name: "",
      age: "",
      address: "",
      contact: "",
      occupation: "",
      aadhar: Array(12).fill(""),
    });
    setAddPersonFlag("");
  };

  useEffect(() => {
    console.log("Updated complaintDetails:", complaintDetails);
  }, [complaintDetails]); //

  return (
    <div className="fixed top-0 z-20 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-30">
      <div className="bg-white relative w-3/4 xs:w-5/6 p-4 xs:p-1 items-center flex-col justify-evenly text-black min-w-[250px]   rounded-xl shadow">
        <MdArrowBack
          onClick={() => setAddPersonFlag("")}
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
            <input
              type="text"
              name="name"
              value={personDetails.name}
              onChange={(e) =>
                setPersonDetails({ ...personDetails, name: e.target.value })
              }
              placeholder="Name"
              className="shadow rounded-lg px-3 py-1 w-full max-w-[400px]  "
            />
          </div>
          <div className="flex flex-row gap-4 xs:flex-wrap max-w-[3/4]">
            <div className="flex flex-col gap-1 min-w-0 w-full ">
              <label className="  font-bold">Age:</label>
              <input
                type="text"
                name="age"
                value={personDetails.age}
                onChange={(e) =>
                  setPersonDetails({
                    ...personDetails,
                    age: e.target.value.replace(/\D/, ""),
                  })
                }
                placeholder="Age"
                className="shadow rounded-lg px-3 py-1  "
              />
            </div>

            <div className="flex flex-col gap-1 min-w-0 w-full">
              <label className=" text-[1rem] font-bold">Occupation:</label>
              <input
                type="text"
                name="occupation"
                value={personDetails.occupation}
                onChange={(e) =>
                  setPersonDetails({
                    ...personDetails,
                    occupation: e.target.value,
                  })
                }
                placeholder="Occupation"
                className="shadow rounded-lg px-3 py-1 "
              />
            </div>
            <div className="flex flex-col gap-1 min-w-0 w-full">
              <label className="text-[1rem] font-bold">
                Contact Number:
              </label>
              <input
                type="text"
                name="contact"
                value={personDetails.contact}
                onChange={(e) =>
                  setPersonDetails({
                    ...personDetails,
                    contact: e.target.value.replace(/\D/, ""),
                  })
                }
                placeholder="Contact Number"
                className="shadow rounded-lg px-3 py-1"
              />
            </div>
          </div>
          <label className="font-bold">Address:</label>
          <textarea
            type="text"
            name="address"
            value={personDetails.address}
            onChange={(e) =>
              setPersonDetails({ ...personDetails, address: e.target.value })
            }
            placeholder="Address..."
            className="shadow rounded-lg px-3 resize-none py-1 "
          />
          <div className="flex-col justify-center w-full">
            <label htmlFor="aadhar" className="font-bold">
              Aadhar Number:
            </label>
            <div className="flex flex-wrap gap-1 text-sm ">
              {personDetails.aadhar.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (aadharInputs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  pattern="[0-9]*"
                  value={digit}
                  onChange={(e) => handleAadharChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className=" w-6 text-md aspect-square  text-center shadow  outline-none rounded-full border border-gray-200  bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                />
              ))}
            </div>
          </div>
          <div className="flex justify-center">
          <button
            className="text-base font-poppins py-1 px-2 bg-green-500 hover:bg-green-600 transition-all duration-300 text-white whitespace-no-wrap border border-gray-200 rounded-md shadow-sm focus:outline-none focus:shadow-none"
            onClick={handleSubmit}
          > 
            Add
          </button>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default AddPeople;
