import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Filterbar({
  currentUser,
  complaints,
  setComplaintList,
  isVisible,
  setIsVisible,
  filters,
  setFilters,
}) {
  const [townTree, setTownTree] = useState({});
  const navidateIo = useNavigate();

  const Categories = [
    "Cognizable Offenses",
    "Non-Cognizable Offenses",
    "Bailable Offenses",
    "Non-Bailable Offenses",
    "Compoundable Offenses",
    "Non-Compoundable Offenses",
    "Offenses against Women",
    "Offenses against Children",
    "Economic Offenses",
    "Cyber Crimes",
    "Drug Offenses",
    "Environmental Offenses",
    "Traffic Offenses",
    "Property Offenses",
    "Terrorism-related Offenses",
    "White-collar Crimes",
    "Corruption Offenses",
    "Fraudulent Practices",
    "Domestic Violence Offenses",
    "Sexual Harassment Offenses",
    "Human Trafficking Offenses",
    "Intellectual Property Crimes",
    "Hate Crimes",
    "Juvenile Offenses",
    "Organized Crime",
    "Money Laundering Offenses",
    "Forgery and Counterfeiting Offenses",
    "Alcohol-related Offenses",
    "Public Order Offenses",
    "Violation of Intellectual Property Rights",
    "Cyberbullying Offenses",
    "Religious Offenses",
    "Wildlife Crimes",
    "Labour Law Violations",
    "Immigration Offenses",
    "Not Identified",
  ];

  useEffect(() => {
    try {
      if (!currentUser || (currentUser.role && currentUser.role !== "super"))
        navidateIo("/");
    } catch (error) {}
  }, [currentUser]);

  useEffect(() => {
    const fetchTownTree = async () => {
      try {
        const res = await axios.post(
          "https://efir-ecru.vercel.app/api/v1/fetchTownTree",
          {}
        );
        setTownTree(res.data.data.TownTree);
      } catch (err) {
        console.error("Error fetching town tree:", err);
      }
    };

    fetchTownTree();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      ["page"]: 1,
      [name]: value,
    }));
  };

  const handleClearAll = () => {
    setFilters({
      page: 1,
      limit: "",
      fromDateIncident: "",
      toDateIncident: "",
      fromDateLastEdited: "",
      toDateLastEdited: "",
      district: "",
      subDistrict: "",
      status: "",
      uniqueUserId: "",
      aadhar: "",
      Categories: "",
    });
  };

  // Check if any filter value is non-empty
  const isFilterActive = Object.keys(filters).some(
    (key) => filters[key] !== ""
  );

  useEffect(() => {
    const fetch = async () => {
      try {
        const URL = generateComplaintFetchLink();
        const result = await axios.get(URL);
        console.log(result.data);

        setComplaintList(result.data);
      } catch (err) {}
    };

    fetch();
  }, [filters]);

  const generateComplaintFetchLink = () => {
    let baseUrl = `https://efir-ecru.vercel.app/api/v1/complaints/fetchSuper/${currentUser._id}`;
    const url = new URL(baseUrl);

    if (filters.page) {
      url.searchParams.set("page", filters.page.toString());
    }

    if (filters.limit) {
      url.searchParams.set("limit", filters.limit.toString());
    }

    if (filters.fromDateIncident) {
      url.searchParams.set("fromDateIncident", filters.fromDateIncident);
    }

    if (filters.toDateIncident) {
      url.searchParams.set("toDateIncident", filters.toDateIncident);
    }

    if (filters.fromDateLastEdited) {
      url.searchParams.set("fromDateLastEdited", filters.fromDateLastEdited);
    }

    if (filters.toDateLastEdited) {
      url.searchParams.set("toDateLastEdited", filters.toDateLastEdited);
    }

    if (filters.district) {
      url.searchParams.set("district", filters.district);
    }

    if (filters.subDistrict) {
      url.searchParams.set("subDistrict", filters.subDistrict);
    }

    if (filters.status) {
      url.searchParams.set("status", filters.status);
    }

    if (filters.uniqueUserId) {
      url.searchParams.set("uniqueUserId", filters.uniqueUserId);
    }

    if (filters.aadhar) {
      url.searchParams.set("aadhar", filters.aadhar);
    }

    if (filters.Categories) {
      url.searchParams.set("Categories", filters.Categories);
    }

    return url.toString();
  };

  return (
    <div
      className={`w-fit z-50 h-[90vh] sticky xs:fixed xs:w-screen xs:h-screen xs:top-0 xs:left-0   xs:bg-opacity-30 flex items-center transition-all duration-500 justify-left xs:justify-center ${
        isVisible
          ? " translate-x-[0] xs:translate-y-[0] xs:bg-black "
          : " -translate-x-[100vw] xs:translate-x-[0] xs:-translate-y-[200vh] max-w-[0px] "
      }`}
    >
      <div className="flex-col justify-center gap-3 relative max-w-[400px]   font-poppins w-fit h-fit p-3 items-center bg-rose-100 rounded-r-xl xs:rounded-xl border text-center">
        <IoCloseOutline
          onClick={() => setIsVisible(false)}
          className="text-3xl text-white p-1 absolute -top-2 xs:block hidden  -right-2 bg-red-400 rounded-full"
        />
        {isFilterActive && (
          <div
            className="text-xs text-blue-500 font-medium text-right cursor-pointer"
            onClick={handleClearAll}
          >
            CLEAR ALL
          </div>
        )}
        <div className="flex flex-col justify-center items-center gap-1 mb-1">
          <label className="block text-gray-700 text-sm w-full font-bold text-left ">
            Expected date of Incident:
          </label>
          <div className="flex gap-1 items-center">
            <label
              className="  block text-gray-700 text-sm"
              htmlFor="fromDateIncident"
            >
              From
            </label>
            <input
              type="date"
              name="fromDateIncident"
              value={filters.fromDateIncident}
              onChange={handleFilterChange}
              className="shadow rounded-lg text-sm px-2 py-1 w-[8.3rem]"
            />
          </div>
          <div className="flex gap-5 items-center ">
            <label className="block text-gray-700 text-sm ">To</label>
            <input
              type="date"
              name="toDateIncident"
              value={filters.toDateIncident}
              onChange={handleFilterChange}
              className="shadow rounded-lg text-sm px-2  py-1 w-[8.3rem]"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-1 my-1">
          <label className="block text-gray-700 text-sm font-bold  text-left">
            Expected date of filing complaint:
          </label>
          <div className="flex gap-1 items-center">
            <label className="  block text-gray-700 text-sm">From</label>
            <input
              type="date"
              name="fromDateLastEdited"
              value={filters.fromDateLastEdited}
              onChange={handleFilterChange}
              className="shadow rounded-lg text-sm px-2 py-1 w-[8.3rem]"
            />
          </div>
          <div className="flex gap-5 items-center">
            <label className="block text-gray-700   text-sm ">To:</label>
            <input
              type="date"
              name="toDateLastEdited"
              value={filters.toDateLastEdited}
              onChange={handleFilterChange}
              className="shadow rounded-lg px-2 text-sm py-1 w-[8.3rem]"
            />
          </div>
        </div>
        <div className=" flex flex-col justify-center  gap-1 mb-2">
          <label className="block text-gray-700 text-sm font-bold text-left">
            District:
          </label>
          <select
            name="district"
            value={filters.district}
            onChange={handleFilterChange}
            className="px-2 py-1 text-sm shadow rounded-lg"
          >
            <option value="">Select District</option>
            {Object.keys(townTree).map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
        <div className="  flex flex-col gap-1">
          <label className="block text-gray-700 text-sm font-bold text-left">
            Sub-District:
          </label>
          <select
            name="subDistrict"
            value={filters.subDistrict}
            onChange={handleFilterChange}
            className="px-2 py-1 text-sm shadow rounded-lg"
          >
            <option value="">Select Sub-District</option>
            {townTree[filters.district] &&
              townTree[filters.district].map((subDistrict) => (
                <option key={subDistrict} value={subDistrict}>
                  {subDistrict}
                </option>
              ))}
          </select>
        </div>
        <div className="  flex flex-col justify-center  gap-1 my-2">
          <label className="block text-gray-700 text-sm font-bold text-left">
            Categories:
          </label>
          <select
            name="Categories"
            value={filters.Categories}
            onChange={handleFilterChange}
            className="px-2 py-1 text-sm shadow overflow-hidden max-w-52 rounded-lg"
          >
            <option value="">Select Categories</option>
            {Categories &&
              Categories.map((ele) => (
                <option className="" key={ele} value={ele}>
                  {ele}
                </option>
              ))}
          </select>
        </div>
        <div className=" flex flex-col justify-center  gap-1 my-2">
          <label className="block text-gray-700 text-sm font-bold  text-left">
            Status:
          </label>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="px-2 py-1 text-sm shadow rounded-lg"
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Park">Park</option>
          </select>
        </div>
        <div className="flex flex-col gap-1  my-2">
          <label className="block text-gray-700 text-sm font-bold text-left">
            Official Identification Number
          </label>
          <input
            type="text"
            className="shadow rounded-lg text-sm  py-1  "
            name="uniqueUserId"
            value={filters.uniqueUserId}
            onChange={handleFilterChange}
          />
        </div>
        <div className="flex flex-col gap-1  mt-2">
          <label className="block text-gray-700 text-sm font-bold text-left">
            Aadhaar Number
          </label>
          <input
            type="text"
            className="shadow rounded-lg text-sm  py-1  "
            name="aadhar"
            value={filters.aadhar}
            onChange={handleFilterChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Filterbar;
