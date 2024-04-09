import React, { useState, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import Personview from "./Personview";

const Complaintview = ({ complaintDetails, setComplaintDetails }) => {
  const [addPersonFlag, setAddPersonFlag] = useState("");
  const [personDetails, setPersonDetails] = useState("");
  const [remark, setRemark] = useState("");
  const [status, setStatus] = useState(null);

  useEffect(() => {
    console.log(complaintDetails);
  }, [complaintDetails]);

  useEffect(() => {
    console.log(complaintDetails);
  }, [complaintDetails]);

  const remarkHandler = (e) => {
    setRemark(e.target.value);
  };

  const statusHandler = (e) => {
    
    const statusValue = e.target.name;
    if(statusValue != true && statusValue != false ){
      console.log("Error")
    }
    else{
      setStatus(statusValue);
      console.log(status);
    }
  };
  return (
    complaintDetails && (
      <div className="min-w-[275px] transition-all duration-500 relative p-4  w-full flex-grow shadow-2xl rounded-xl">
        <div
          onClick={() => setComplaintDetails("")}
          className="absolute top-4 left-3 rounded-full bg-green-600 cursor-pointer hover:bg-green-700 transition-all duration-200 text-xl p-1 text-white"
        >
          <IoMdArrowRoundBack />
        </div>
        <div className="  flex flex-col gap-y-6 justify-center items-center ">
          <div className="text-2xl font-bold font-poppins ">Complaint</div>
          <div className=" border-gray-300  space-y-3 p-4  relative border-4 w-full flex flex-col  rounded-2xl">
            <div className="absolute font-bold font-poppins bg-white px-2 text-xl -top-3 left-2">
              Incident Details
            </div>
            <lable className="mx-2  ">
              <span className="mr-4 text-[1rem] font-bold">
                Date Of Incident:
              </span>
              <input
                disabled
                type="date"
                id="TimeDateofIncident"
                value={
                  complaintDetails &&
                  complaintDetails.IncidentDetail &&
                  new Date(complaintDetails.IncidentDetail.TimeDateofIncident)
                    .toISOString()
                    .split("T")[0]
                }
                className="shadow rounded-lg px-3 py-1 w-[8.7rem]"
              />
            </lable>
            <div className="relative p-3 border-slate-200 border-2 rounded-xl">
              <div className="absolute font-poppins font-bold bg-white px-2 -top-3 left-2">
                Place Of Incident
              </div>
              <lable className="mx-2 py-2 flex flex-col space-y-3">
                <textarea
                  disabled
                  placeholder="Landmark..."
                  value={
                    complaintDetails &&
                    complaintDetails.IncidentDetail &&
                    complaintDetails.IncidentDetail.LandMark
                  }
                  className=" p-3 rounded-xl resize-none shadow w-full"
                ></textarea>
                <div className="flex gap-x-8 flex-wrap">
                  <div>
                    <span className="mr-4 text-[1rem] font-bold">
                      District:
                    </span>

                    <select
                      id="District"
                      disabled
                      className="px-2 py-1 shadow rounded-lg"
                    >
                      <option selected>
                        {complaintDetails &&
                        complaintDetails.IncidentDetail &&
                        complaintDetails.IncidentDetail.District
                          ? complaintDetails.IncidentDetail.District
                          : "Not Mentioned"}
                      </option>
                    </select>
                  </div>
                  <div>
                    <span className="text-[1rem] font-bold">Sub-District:</span>

                    <select
                      id="SubDistrict"
                      disabled
                      value={
                        complaintDetails &&
                        complaintDetails.IncidentDetail &&
                        complaintDetails.IncidentDetail.SubDistrict
                      }
                      className="px-2 py-1 shadow rounded-lg"
                    >
                      <option selected>
                        {complaintDetails &&
                        complaintDetails.IncidentDetail &&
                        complaintDetails.IncidentDetail.SubDistrict
                          ? complaintDetails.IncidentDetail.SubDistrict
                          : "Not Mentioned"}
                      </option>
                    </select>
                  </div>
                </div>
              </lable>
            </div>
            <lable className="mx-2 flex flex-col space-y-3">
              <div className="mr-4 text-[1rem] font-bold">
                Incident Description:
              </div>
              <textarea
                placeholder="Incident Description..."
                disabled
                className=" p-3 rounded-xl resize-none shadow w-full"
                value={
                  complaintDetails &&
                  complaintDetails.IncidentDetail &&
                  complaintDetails.IncidentDetail.IncidentDescription
                }
                // value={complaintDetails &&
                //   complaintDetails.IncidentDetail &&}
              ></textarea>
            </lable>
            <div className="relative p-3 border-slate-200 border-2 rounded-xl">
              <div className="absolute font-poppins font-bold bg-white px-2 -top-3 left-2">
                Complaint filed by
              </div>
              <label className="mx-2 py-2 flex flex-col space-y-3">
                <div className="flex flex-row gap-4 xs:flex-wrap max-w-[3/4]">
                  <div className="flex flex-col gap-1 min-w-0 w-full">
                    <label className="font-bold">Name:</label>
                    <input
                      disabled
                      type="text"
                      name="age"
                      value={
                        complaintDetails &&
                        complaintDetails.filedBy &&
                        complaintDetails.filedBy.name
                      }
                      placeholder="Age"
                      className="shadow rounded-lg px-3 py-1 max-w-96"
                    />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0 w-full">
                    <label className="text-[1rem] font-bold">
                      Contact Number:
                    </label>
                    <input
                      disabled
                      type="text"
                      name="contact"
                      value={
                        complaintDetails &&
                        complaintDetails.filedBy &&
                        complaintDetails.filedBy.mobile
                      }
                      placeholder="Contact Number"
                      className="shadow rounded-lg px-3 py-1 max-w-96"
                    />
                  </div>
                </div>

                <div className="mr-4 text-[1rem] font-bold inline-block ">
                  Email ID:
                </div>
                <input
                  type="text"
                  disabled
                  value={
                    complaintDetails &&
                    complaintDetails.filedBy &&
                    complaintDetails.filedBy.email
                  }
                  className="shadow rounded-lg px-3 py-1 w-full max-w-[500px]"
                ></input>
              </label>
            </div>
          </div>
          {complaintDetails &&
            complaintDetails.VictimIds &&
            complaintDetails.VictimIds.length > 0 && (
              <div className=" border-gray-300  space-y-3 p-4  relative border-4 w-full flex flex-col  rounded-2xl">
                <div className="absolute font-poppins font-bold bg-white px-2 text-xl -top-3 left-2">
                  Victim Details
                </div>

                {
                  <table className="table-auto select-none text-sm w-full border-collapse border border-gray-300">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 px-2 py-1">
                          Name
                        </th>
                        <th className="border border-gray-300 px-2 py-1">
                          Contact
                        </th>
                        <th className="border border-gray-300 px-2 py-1">
                          Address
                        </th>
                        <th className="border border-gray-300 px-4 py-1 w-10 ">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {complaintDetails.VictimIds.map((ele, index) => (
                        <tr
                          key={index}
                          className=" hover:bg-slate-100 transition-all duration-200"
                        >
                          <td className="border text-center border-gray-300 px-2 py-1">
                            {ele.name}
                          </td>
                          <td className="border text-center border-gray-300 px-2 py-1">
                            {ele.contact}
                          </td>
                          <td className="border text-center border-gray-300 px-2 py-1">
                            {ele.address}
                          </td>
                          <td className=" flex gap-3 text-sm font- text-white text-center justify-center items-center py-1 px-2">
                            <div
                              onClick={() => {
                                setPersonDetails(ele);
                                setAddPersonFlag("VictimArray");
                              }}
                              className="rounded-full bg-green-600 cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-green-700 px-2 py-1"
                            >
                              View
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                }
              </div>
            )}

          {complaintDetails &&
            complaintDetails.AccusedIds &&
            complaintDetails.AccusedIds.length > 0 && (
              <div className=" border-gray-300  space-y-3 p-4  relative border-4 w-full flex flex-col  rounded-2xl">
                <div className="absolute font-poppins font-bold bg-white px-2 text-xl -top-3 left-2">
                  Accused Details
                </div>

                {
                  <table className="table-auto select-none text-sm w-full border-collapse border border-gray-300">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 px-2 py-1">
                          Name
                        </th>
                        <th className="border border-gray-300 px-2 py-1">
                          Contact
                        </th>
                        <th className="border border-gray-300 px-2 py-1">
                          Address
                        </th>
                        <th className="border border-gray-300 px-4 py-1 w-10 ">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {complaintDetails.AccusedIds.map((ele, index) => (
                        <tr
                          key={index}
                          className=" hover:bg-slate-100 transition-all duration-200"
                        >
                          <td className="border text-center border-gray-300 px-2 py-1">
                            {ele && ele.name}
                          </td>
                          <td className="border text-center border-gray-300 px-2 py-1">
                            {ele && ele.contact}
                          </td>
                          <td className="border text-center border-gray-300 px-2 py-1">
                            {ele && ele.address}
                          </td>
                          <td className=" flex gap-3 text-sm text-white text-center justify-center items-center px-2 py-1">
                            <div
                              onClick={() => {
                                setPersonDetails(ele);
                                setAddPersonFlag("AccusedArray");
                              }}
                              className="rounded-full bg-green-600 cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-green-700 px-2 py-1"
                            >
                              View
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                }
              </div>
            )}

          {complaintDetails &&
            complaintDetails.WitnessIds &&
            complaintDetails.WitnessIds.length > 0 && (
              <div className=" border-gray-300  space-y-3 p-4  relative border-4 w-full flex flex-col  rounded-2xl">
                <div className="absolute font-poppins font-bold bg-white px-2 text-xl -top-3 left-2">
                  Witness Details
                </div>

                {
                  <table className="table-auto select-none text-sm w-full border-collapse border border-gray-300">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 px-2 py-1">
                          Name
                        </th>
                        <th className="border border-gray-300 px-2 py-1">
                          Contact
                        </th>
                        <th className="border border-gray-300 px-2 py-1">
                          Address
                        </th>
                        <th className="border border-gray-300 px-4 py-1 w-10 ">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {complaintDetails.WitnessIds.map((ele, index) => (
                        <tr
                          key={index}
                          className=" hover:bg-slate-100 transition-all duration-200"
                        >
                          <td className="border text-center border-gray-300 px-2 py-1">
                            {ele && ele.name}
                          </td>
                          <td className="border text-center border-gray-300 px-2 py-1">
                            {ele && ele.contact}
                          </td>
                          <td className="border text-center border-gray-300 px-2 py-1">
                            {ele && ele.address}
                          </td>
                          <td className=" flex gap-3 text-sm text-white text-center justify-center items-center px-2 py-1">
                            <div
                              onClick={() => {
                                setPersonDetails(ele);
                                setAddPersonFlag("WitnessArray");
                              }}
                              className="rounded-full bg-green-600 cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-green-700 px-2 py-1"
                            >
                              View
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                }
              </div>
            )}

          {complaintDetails &&
            complaintDetails.evidences &&
            complaintDetails.evidences.length > 0 && (
              <div className=" border-gray-300  space-y-3 p-4  relative border-4 w-full flex flex-col  rounded-2xl">
                <div className="absolute font-poppins font-bold bg-white px-2 text-xl -top-3 left-2">
                  Evidences
                </div>

                <div className="flex flex-col gap-1">
                  {complaintDetails &&
                    complaintDetails.evidences &&
                    complaintDetails.evidences.map((ele) => (
                      <div className="flex gap-2 items-center text-sm bg-slate-100 w-fit px-2 py-1 rounded-lg ">
                        <div>{ele}</div>
                      </div>
                    ))}
                </div>
              </div>
            )}
        </div>
        <div className="border-gray-300 space-y-3 p-4 relative border-4 w-full flex flex-col rounded-2xl">
          <div className="mr-4 text-[1rem] font-bold">Remark:</div>
          <div className="flex items-center space-x-4">
            {" "}
            {/* Flex container for buttons */}
            <textarea
              className="p-3 rounded-xl resize-none shadow w-[75%] min-w-24"
              value={remark}
              onChange={remarkHandler}
            ></textarea>
            <div className=" flex-col sm:flex-row flex-grow space-y-2 items-end sm:justify-center  sm:space-x-0 ">
              {" "}
              {/* Flex container for buttons */}
              <button
                class="inline-block min-w-max  bg-gradient-to-br from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 border-0 rounded-md shadow-md text-white font-medium text-sm py-2 px-4 focus:outline-none transition duration-300 ease-in-out mx-1"
                name="true"
                onClick={statusHandler}
              >
                ACCEPT
              </button>
              {remark && (
                <button
                  class="inline-block min-w-max bg-gradient-to-br from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 border-0 rounded-md shadow-md text-white font-medium text-sm py-2 px-4 focus:outline-none transition duration-300 ease-in-out mx-1" name="false"
                  onClick={statusHandler}
                >
                  REJECT
                </button>
              )}
            </div>
          </div>
            {!remark && <label className=" font-semibold  text-red-600 md:text-base text-sm">*Enter remark to reject complaint</label>}
        </div>

        {personDetails && (
          <Personview
            addPersonFlag={addPersonFlag}
            personDetails={personDetails}
            setAddPersonFlag={setAddPersonFlag}
            setPersonDetails={setPersonDetails}
          />
        )}
      </div>
    )
  );
};

export default Complaintview;
