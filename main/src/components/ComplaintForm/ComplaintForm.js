import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import AddPeople from "./AddPeople";
import { LiaUserEditSolid } from "react-icons/lia";
import { AiOutlineUserDelete } from "react-icons/ai";
import { IoMdRemoveCircleOutline } from "react-icons/io";

const ComplaintForm = ({ user }) => {
  const [townTree, setTownTree] = useState({});
  const [addPersonFlag, setAddPersonFlag] = useState("");
  const [complaintDetails, setComplaintDetails] = useState({
    VictimArray: [],
    AccusedArray: [],
    WitnessArray: [],
    IncidentDetail: {
      TimeDateofIncident: "",
      LandMark: "",
      District: "",
      SubDistrict: "",
    },
    evidences: [],
  });
  const [personDetails, setPersonDetails] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/v1/fetchTownTree",
          {}
        );
        console.log(res);
        setTownTree(res.data.data.TownTree);
      } catch (err) {}
    };

    fetch();
  }, []);


  const registerHandler = async () => {
    try {
        const formData = new FormData();
        // formData.append("userId", userId);
        formData.append(
          "IncidentDetails",
          JSON.stringify(complaintDetails.IncidentDetail)
        );
        formData.append(
          "VictimArray",
          JSON.stringify(complaintDetails.VictimArray)
        );
        formData.append(
          "AccusedArray",
          JSON.stringify(complaintDetails.AccusedArray)
        );
        formData.append(
          "WitnessArray",
          JSON.stringify(complaintDetails.WitnessArray)
        );
        complaintDetails.evidences.forEach((file, index) => {
          formData.append(`evidences[${index}]`, file);
        });

      const response = await axios.post(
        "http://localhost:5000/api/v1/complaints/register-complaint",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("FIR filed successfully:", response.data);
    } catch (error) {
      console.error("Error filing FIR:", error);
    }
  };

  const onIncidentHandler = (event) => {
    const { id, value } = event.target;
    console.log(complaintDetails);
    setComplaintDetails((pre) => {
      return {
        ...pre,
        IncidentDetail: {
          ...pre.IncidentDetail,
          SubDistrict: "",
          [id]: value,
        },
      };
    });
  };

  const fileInsertHandler = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
  
    const fileArray = Array.from(files);
  
    setComplaintDetails((prev) => ({
      ...prev,
      evidences: [...prev.evidences, ...fileArray],
    }));
  };
  
  useEffect(() => {
    console.log(complaintDetails);
  }, [complaintDetails]);
  

  return (
    <div className="min-w-[275px] p-4  w-full max-w-[900px] shadow-2xl rounded-xl">
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
              type="date"
              className="shadow rounded-lg px-3 py-1 w-[8.7rem]"
            />
          </lable>
          <div className="relative p-3 border-slate-200 border-2 rounded-xl">
            <div className="absolute font-poppins font-bold bg-white px-2 -top-3 left-2">
              Place Of Incident
            </div>
            <lable className="mx-2 py-2 flex flex-col space-y-3">
              <textarea
                placeholder="Landmark..."
                className=" p-3 rounded-xl resize-none shadow w-full"
              ></textarea>
              <div className="flex gap-x-8 flex-wrap">
                <div>
                  <span className="mr-4 text-[1rem] font-bold">District:</span>

                  <select
                    id="District"
                    onChange={onIncidentHandler}
                    value={complaintDetails.IncidentDetail.District}
                    className="px-2 py-1 shadow rounded-lg"
                  >
                    <option selected>Select Districts</option>
                    {Object.keys(townTree).map((ele) => (
                      <option id={ele}>{ele}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <span className="text-[1rem] font-bold">Sub-District:</span>

                  <select
                    id="SubDistrict"
                    onChange={onIncidentHandler}
                    value={complaintDetails.IncidentDetail.SubDistrict}
                    className="px-2 py-1 shadow rounded-lg"
                  >
                    <option selected>Select Sub-Districts</option>
                    {townTree &&
                      townTree[complaintDetails.IncidentDetail.District] &&
                      townTree[complaintDetails.IncidentDetail.District].map(
                        (ele) => <option>{ele}</option>
                      )}
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
              className=" p-3 rounded-xl resize-none shadow w-full"
            ></textarea>
          </lable>
        </div>

        <div className=" border-gray-300  space-y-3 p-4  relative border-4 w-full flex flex-col  rounded-2xl">
          <div className="absolute font-poppins font-bold bg-white px-2 text-xl -top-3 left-2">
            Victim Details
          </div>
          <div
            onClick={() => setAddPersonFlag("VictimArray")}
            className="flex gap-1 font-lato select-none hover:scale-105 transition-all duration-300 cursor-pointer text-bold w-fit px-2 py-1 rounded-md  justify-center items-center"
          >
            <IoMdAdd className="text-2xl bg-green-500 rounded-full text-white p-1" />
            Victim
          </div>
          {complaintDetails.VictimArray.length > 0 && (
            <table className="table-auto select-none text-sm w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-2 py-1">Name</th>
                  <th className="border border-gray-300 px-2 py-1">Contact</th>
                  <th className="border border-gray-300 px-2 py-1">Address</th>
                  <th className="border border-gray-300 px-4 py-1 w-10 ">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {complaintDetails.VictimArray.map((ele, index) => (
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
                    <td className=" flex gap-3 text-2xl font-bold text-white text-center justify-center items-center px-2 py-1">
                      <LiaUserEditSolid
                        onClick={() => {
                          setPersonDetails(ele);
                          setAddPersonFlag("VictimArray");
                        }}
                        className="rounded-full bg-green-600 cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-green-700 p-1"
                      />
                      <AiOutlineUserDelete
                        onClick={() =>
                          setComplaintDetails((pre) => {
                            return {
                              ...pre,
                              ["VictimArray"]: pre.VictimArray.filter(
                                (obj) => obj !== ele
                              ),
                            };
                          })
                        }
                        className="rounded-full bg-red-500 cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-red-700 p-1"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className=" border-gray-300  space-y-3 p-4  relative border-4 w-full flex flex-col  rounded-2xl">
          <div className="absolute font-poppins font-bold bg-white px-2 text-xl -top-3 left-2">
            Accused Details
          </div>
          <div
            onClick={() => setAddPersonFlag("AccusedArray")}
            className="flex gap-1 font-lato select-none hover:scale-105 transition-all duration-300 cursor-pointer text-bold w-fit px-2 py-1 rounded-md  justify-center items-center"
          >
            <IoMdAdd className="text-2xl bg-green-500 rounded-full text-white p-1" />
            Accuss
          </div>

          {complaintDetails.AccusedArray.length > 0 && (
            <table className="table-auto select-none text-sm w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-2 py-1">Name</th>
                  <th className="border border-gray-300 px-2 py-1">Contact</th>
                  <th className="border border-gray-300 px-2 py-1">Address</th>
                  <th className="border border-gray-300 px-4 py-1 w-10 ">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {complaintDetails.AccusedArray.map((ele, index) => (
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
                    <td className=" flex gap-3 text-2xl font-bold text-white text-center justify-center items-center px-2 py-1">
                      <LiaUserEditSolid
                        onClick={() => {
                          setPersonDetails(ele);
                          setAddPersonFlag("AccusedArray");
                        }}
                        className="rounded-full bg-green-600 cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-green-700 p-1"
                      />
                      <AiOutlineUserDelete
                        onClick={() =>
                          setComplaintDetails((pre) => {
                            return {
                              ...pre,
                              ["AccusedArray"]: pre.AccusedArray.filter(
                                (obj) => obj !== ele
                              ),
                            };
                          })
                        }
                        className="rounded-full bg-red-500 cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-red-700 p-1"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className=" border-gray-300  space-y-3 p-4  relative border-4 w-full flex flex-col  rounded-2xl">
          <div className="absolute font-poppins font-bold bg-white px-2 text-xl -top-3 left-2">
            Witness Details
          </div>
          <div
            onClick={() => setAddPersonFlag("WitnessArray")}
            className="flex gap-1 font-lato select-none hover:scale-105 transition-all duration-300 cursor-pointer text-bold w-fit px-2 py-1 rounded-md  justify-center items-center"
          >
            <IoMdAdd className="text-2xl bg-green-500 rounded-full text-white p-1" />
            Witness
          </div>
          {complaintDetails.WitnessArray.length > 0 && (
            <table className="table-auto select-none text-sm w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-2 py-1">Name</th>
                  <th className="border border-gray-300 px-2 py-1">Contact</th>
                  <th className="border border-gray-300 px-2 py-1">Address</th>
                  <th className="border border-gray-300 px-4 py-1 w-10 ">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {complaintDetails.WitnessArray.map((ele, index) => (
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
                    <td className=" flex gap-3 text-2xl font-bold text-white text-center justify-center items-center px-2 py-1">
                      <LiaUserEditSolid
                        onClick={() => {
                          setPersonDetails(ele);
                          setAddPersonFlag("WitnessArray");
                        }}
                        className="rounded-full bg-green-600 cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-green-700 p-1"
                      />
                      <AiOutlineUserDelete
                        onClick={() =>
                          setComplaintDetails((pre) => {
                            return {
                              ...pre,
                              ["WitnessArray"]: pre.WitnessArray.filter(
                                (obj) => obj !== ele
                              ),
                            };
                          })
                        }
                        className="rounded-full bg-red-500 cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-red-700 p-1"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className=" border-gray-300  space-y-3 p-4  relative border-4 w-full flex flex-col  rounded-2xl">
          <div className="absolute font-poppins font-bold bg-white px-2 text-xl -top-3 left-2">
            Evidences
          </div>
          <div className="relative">
            <input
              type="file"
              onChange={fileInsertHandler}
              id="evidence"
              className="absolute -z-50 hidden"
            />
            <label
              htmlFor="evidence"
              className="flex gap-1 font-lato select-none hover:scale-105 transition-all duration-300 cursor-pointer text-bold w-fit px-2 py-1 rounded-md  justify-center items-center "
            >
              <IoMdAdd className="text-2xl bg-green-500 rounded-full text-white p-1" />
              Evidence
            </label>
          </div>
          <div className="flex flex-col gap-1">
            {complaintDetails.evidences.map((ele) => (
              <div className="flex gap-2 items-center text-sm bg-slate-100 w-fit px-2 py-1 rounded-lg ">
                <div>{ele.name}</div>
                <IoMdRemoveCircleOutline
                  onClick={() =>
                    setComplaintDetails((pre) => ({
                      ...pre,
                      ["evidences"]: [
                        ...pre.evidences.filter((obj) => obj !== ele),
                      ],
                    }))
                  }
                  className="text-2xl bg-red-500 p-1 rounded-full text-white cursor-pointer hover:scale-105 transition-all duration-300 "
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {addPersonFlag && (
        <AddPeople
          addPersonFlag={addPersonFlag}
          personDetailsFromMainForm={personDetails}
          setPersonDetailsFromMainForm={setPersonDetails}
          setAddPersonFlag={setAddPersonFlag}
          setComplaintDetails={setComplaintDetails}
          complaintDetails={complaintDetails}
        />
      )}
      <div className="w-full justify-center flex my-4">
        <button
          onClick={registerHandler}
          className="font-bold font-poppins py-1 px-2 bg-green-500 hover:bg-green-700 text-white rounded-lg hover:scale-105 transition-all duration-500"
        >
          Register Complaint
        </button>
      </div>
    </div>
  );
};

export default ComplaintForm;
