import React, { useEffect, useState } from "react";
import Complaintview from "./Complaintview";

function Displaybar({ complaints }) {
  const [currentComplaint, setCurrentComplaint] = useState("");
  useEffect(() => {
    try{
      setCurrentComplaint("");
    }catch(err){}
  }, [complaints])
  return (
    <div className="w-full">
      {!currentComplaint && (
        <div className="h-[90vh] flex-grow my-2 mr-2">
          <h2 className="text-center text-2xl  mb-2 font-bold">Complaints</h2>
          <div
            className="flex text-center justify-between  font-bold"
            style={{ backgroundColor: "#AEDEFC" }}
          >
            <div className=" w-[33%] md:w-[25%] p-2">Complaint Id's</div>
            <div className=" w-[33%] md:w-[25%] p-2">Date of Filing</div>
            <div className=" w-[33%] md:w-[25%] p-2 hidden md:block">
              District
            </div>
            <div className=" w-[33%] md:w-[25%] p-2">View Complaint</div>
          </div>

          <div className="my-2">
            {complaints.map((complaint, index) => {
              let color = "";
              if (index % 2) color = "#F5F5F5";
              return (
                <div key={index} className="flex text-center">
                  <div
                    className=" w-[33%] md:w-[25%] p-2"
                    style={{ backgroundColor: color }}
                  >
                    {complaint.firId}
                  </div>
                  <div
                    className=" w-[33%] md:w-[25%] p-2"
                    style={{ backgroundColor: color }}
                  >
                    {complaint.LastEdited.slice(0, 10)}
                  </div>
                  <div
                    className="hidden md:block w-[25%] p-2"
                    style={{ backgroundColor: color }}
                  >
                    {complaint &&
                      complaint.IncidentDetail &&
                      complaint.IncidentDetail.District}
                  </div>
                  <div
                    className=" w-[33%] md:w-[25%] p-2"
                    style={{ backgroundColor: color }}
                  >
                    <button
                      onClick={() => setCurrentComplaint(complaint)}
                      class=" bg-gradient-to-br from-blue-400 to-blue-500 hover:bg-gradient-to-tl  text-white font-medium text-sm py-1 px-4 rounded-full focus:outline-none transition duration-200 ease-in-out"
                    >
                      View
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {}
      <div className="mx-4 xs:mx-1">
        <Complaintview
          complaintDetails={currentComplaint}
          setComplaintDetails={setCurrentComplaint}
        />
      </div>
    </div>
  );
}

export default Displaybar;
