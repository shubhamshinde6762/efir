import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Complaintview from "./Complaintview";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { IoFilter } from "react-icons/io5";

function Displaybar({
  complaints,
  setComplaintList,
  myComplaints,
  setFilters,
  currentUser,
  filters,
  setIsVisible,
  heading,
}) {
  const [currentComplaint, setCurrentComplaint] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [numbers, setNumbers] = useState([0]);
  const [key, setKey] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [summaryPopup, setSummaryPopup] = useState(false);
  const [categoryPopup, setCategoryPopup] = useState(false);

  useEffect(() => {
    try {
      setTotalPage(complaints.totalPages);
      setCurrentPage(complaints.currentPage);
    } catch (err) {}
  }, [complaints]);

  useEffect(() => {
    try {
      setNumbers([...Array(totalPage + 1).keys()].slice(1));
    } catch (error) {}
  }, [totalPage]);

  const prevPage = () => {
    if (currentPage !== 1)
      setFilters((pre) => ({
        ...pre,
        page: currentPage - 1,
      }));
  };

  const changeCurrPage = (id) => {
    setFilters((pre) => ({
      ...pre,
      page: id,
    }));
  };

  const nextPage = () => {
    if (currentPage !== totalPage)
      setFilters((pre) => ({
        ...pre,
        page: currentPage + 1,
      }));
  };

  useEffect(() => {
    try {
      setCurrentComplaint("");
    } catch (err) {}
  }, [complaints]);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [complaints]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-200";
      case "Park":
        return "bg-red-200";
      case "Pending":
        return "bg-blue-200";
      default:
        return "bg-gray-200";
    }
  };

  const categoryHandler = (category, pop) => {
    if (!category.length || category[0] === "Not Identified")
      return "Not identified";
    if (pop) return category.join(", ");
    return `${category[0]}...`;
  };
  const summaryHandler = (summary, pop) => {
    if (!summary) return "Summary not provided";
    if (pop) return summary;
    return `${summary.substring(0, 70)}...`;
  };

  return (
    <div className="w-full bg-white rounded-xl bg-opacity-70 flex-grow transition-all duration-500">
      {!currentComplaint && (
        <div
          key={key}
          className="flex-grow py-2 mr-2 transition-all duration-500"
        >
          <div className="w-full flex relative">
            {!myComplaints && (
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                onClick={() => setIsVisible((pre) => !pre)}
                className="text-xl cursor-pointer flex items-center gap-2 text-violet-700 absolute top-1 left-2"
              >
                <IoFilter />
                <span className="font-poppins text-lg">Filters</span>
              </motion.div>
            )}

            <h2 className="text-center text-2xl w-full  mb-2 font-bold">
              {heading}
            </h2>
          </div>
          <div
            className="flex text-center justify-between  font-bold"
            style={{ backgroundColor: "#AEDEFC" }}
          >
            <div className="w-[33%] md:w-[25%] p-2">Complaint Id's</div>
            <div className="w-[33%] md:w-[25%] p-2">Date of Filing</div>
            <div className="w-[33%] md:w-[25%] p-2 hidden md:block">
              District
            </div>
            <div className="w-[33%] md:w-[25%] p-2">View Complaint</div>
          </div>

          <div className="my-2">
            {complaints &&
              complaints.complaints &&
              complaints.complaints.length > 0 &&
              complaints.complaints.map((complaint, index) => {
                let color = "";
                if (index % 2) color = "#F5F5F5";
                return (
                  <div key={index} className="flex-col">
                    <div
                      className="flex relative cursor-pointer text-center"
                      style={{ backgroundColor: color }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <div className="w-[33%] md:w-[25%] p-2">
                        {complaint.firId}
                      </div>
                      <div className="w-[33%] md:w-[25%] p-2">
                        {complaint.LastEdited.slice(0, 10)}
                      </div>
                      <div className="hidden md:block w-[25%] p-2">
                        {complaint &&
                          complaint.IncidentDetail &&
                          complaint.IncidentDetail.District}
                      </div>
                      <div className="w-[33%] md:w-[25%] p-2">
                        <button
                          onClick={() => setCurrentComplaint(complaint)}
                          className="bg-gradient-to-br from-blue-400 to-blue-500 hover:bg-gradient-to-tl text-white font-medium text-sm py-1 px-4 rounded-full focus:outline-none transition duration-200 ease-in-out"
                        >
                          View
                        </button>
                      </div>
                    </div>
                    {myComplaints && hoveredIndex === index && (
                      <div
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="flex justify-around border-x-2 border-b-2 border-x-slate-200 mb-2 p-2 rounded-b-xl shadow-md"
                      >
                        <div
                          className={`status-overlay font-semibold ${getStatusColor(
                            complaint.complaintStatus.status
                          )} font-poppins rounded-full py-1 px-2 text-center sm:text-base text-sm`}
                        >
                          Status: {complaint.complaintStatus.status}
                        </div>
                        {complaint.complaintStatus.status === "Pending" &&
                          !complaint.complaintStatus.remark && (
                            <div
                              className={`status-overlay font-semibold font-poppins rounded-full py-1 px-2 text-center sm:text-base text-sm `}
                            >
                              Remark: Not assessed
                            </div>
                          )}
                        {complaint.complaintStatus.status !== "Pending" &&
                          complaint.complaintStatus.remark && (
                            <div
                              className={`status-overlay font-semibold font-poppins rounded-full py-1 px-2 text-center sm:text-base text-sm`}
                            >
                              Remark: {complaint.complaintStatus.remark}
                            </div>
                          )}
                      </div>
                    )}
                    {!myComplaints && hoveredIndex === index && (
                      <div
                        className="flex justify-around border-x-2 border-b-2 border-x-slate-200 mb-2 p-2 rounded-b-xl shadow-md "
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <div
                          className={`status-overlay font-medium font-poppins rounded-full py-1 px-2  max-w-92 text-center text-sm relative`}
                        >
                          <span
                            className="font-semibold rounded-sm py-1 px-2 bg-blue-200 cursor-pointer sm:text-base text-sm "
                            onClick={() => setCategoryPopup(!categoryPopup)}
                            onMouseEnter={() => setCategoryPopup(true)}
                            onMouseLeave={() => setCategoryPopup(false)}
                          >
                            Category:
                          </span>{" "}
                          {categoryHandler(complaint.Categories, false)}
                          {categoryPopup && (
                            <div className=" bg-white border b-[-1px] -right-0  border-gray-300 shadow-md p-2 z-40 absolute ">
                              {categoryHandler(complaint.Categories, true)}{" "}
                            </div>
                          )}
                        </div>

                        <div
                          className={`status-overlay font-medium font-poppins rounded-full py-1 px-2 max-w-92 text-center text-sm relative`}
                        >
                          <span
                            className="font-semibold rounded-sm py-1 px-2 bg-blue-200 cursor-pointer sm:text-base text-sm "
                            onClick={() => setSummaryPopup(!summaryPopup)}
                            onMouseEnter={() => setSummaryPopup(true)}
                            onMouseLeave={() => setSummaryPopup(false)}
                          >
                            Summary:
                          </span>{" "}
                          {summaryHandler(complaint.Summary, false)}
                          {summaryPopup && (
                            <div className="absolute b-[2px] -right-0 bg-white border border-gray-300 shadow-md p-2 z-10">
                              {summaryHandler(complaint.Summary, true)}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>

          {!currentComplaint &&
            !myComplaints &&
            complaints.complaints &&
            complaints.complaints.length > 0 && (
              <nav className="flex justify-center my-4">
                <ul className="flex gap-x-2">
                  {currentPage !== 1 && (
                    <li className="inline-block list-none">
                      <button
                        onClick={prevPage}
                        className="flex justify-center items-center w-10 h-10 leading-10 bg-white text-center text-decoration-none text-gray-700 rounded-l-full rounded-r-none shadow-md hover:text-white hover:bg-[#AEDEFC] transition-all duration-300 ease-in-out"
                      >
                        <IoMdArrowBack />
                      </button>
                    </li>
                  )}
                  {numbers.map((n, i) => (
                    <li key={i} className="inline-block list-none">
                      <button
                        onClick={() => changeCurrPage(n)}
                        className={`block w-10 h-10 leading-10  text-center text-decoration-none text-gray-700 rounded-md shadow-md hover:text-white hover:bg-[#AEDEFC] transition-all duration-300 ease-in-out ${
                          currentPage === n ? "bg-[#AEDEFC]" : "white"
                        }`}
                      >
                        {n}
                      </button>
                    </li>
                  ))}
                  {currentPage !== totalPage && (
                    <li className="inline-block list-none">
                      <button
                        onClick={nextPage}
                        className="flex justify-center items-center w-10 h-10 leading-10 bg-white text-center text-decoration-none text-gray-700 rounded-l-none rounded-r-full shadow-md hover:text-white hover:bg-[#AEDEFC] transition-all duration-300 ease-in-out"
                      >
                        <IoMdArrowForward />
                      </button>
                    </li>
                  )}
                </ul>
                <div className="text-sm flex justify-center items-center gap-2 mx-2">
                  <select
                    className="cursor-pointer ring-indigo-500 ring-2 rounded-xl font-bold"
                    onChange={(e) =>
                      setFilters((pre) => ({
                        ...pre,
                        limit: e.target.value,
                      }))
                    }
                    value={filters.limit}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </nav>
            )}
        </div>
      )}
      <div className="mx-4 xs:mx-1 transition-all duration-500">
        <Complaintview
          complaintDetails={currentComplaint}
          setComplaintDetails={setCurrentComplaint}
          myComplaints={myComplaints}
          currentUser={currentUser}
          setFilters={setFilters}
        />
      </div>
    </div>
  );
}

export default Displaybar;
