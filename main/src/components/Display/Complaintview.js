import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
// import AddPeople from "./AddPeople";
import { LiaUserEditSolid } from "react-icons/lia";
import { AiOutlineUserDelete } from "react-icons/ai";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";

const Complaintview = ({ complaintDetails, setComplaintDetails }) => {
  const [addPersonFlag, setAddPersonFlag] = useState("");
  const [personDetails, setPersonDetails] = useState("");

  useEffect(() => {
    console.log(complaintDetails);
  }, [complaintDetails]);

  return (
    complaintDetails && (
      <div className="min-w-[275px] relative p-4  w-full flex-grow shadow-2xl rounded-xl">
        <div
          onClick={() => setComplaintDetails("")}
          className="absolute top-4 left-3 rounded-full bg-green-600 hover:bg-green-700 transition-all duration-200 text-xl p-1 text-white"
        >
          <IoMdArrowRoundBack />
        </div>
        <div className="  flex flex-col gap-y-6 justify-center items-center ">
          <div className="text-2xl font-bold font-poppins ">
            Complaint Registration
          </div>
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

        {/* {addPersonFlag && (
        <AddPeople
          addPersonFlag={addPersonFlag}
          personDetailsFromMainForm={personDetails}
          setPersonDetailsFromMainForm={setPersonDetails}
          setAddPersonFlag={setAddPersonFlag}
          setComplaintDetails={setComplaintDetails}
          complaintDetails={complaintDetails}
        />
      )} */}
      </div>
    )
  );
};

export default Complaintview;
