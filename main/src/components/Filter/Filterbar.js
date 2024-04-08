import React, { useState, useEffect } from "react";
import axios from "axios";

function Filterbar({ currentUser }) {
  const [filters, setFilters] = useState({
    fromDateIncident: "",
    toDateIncident: "",
    fromDateLastEdited: "",
    toDateLastEdited: "",
    district: "",
    subDistrict: "",
    aadhar: "",
    page: 1,
    limit: 10,
  });
  const [townTree, setTownTree] = useState({});

  useEffect(() => {
    const fetchTownTree = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/v1/fetchTownTree",
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
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const URL = generateComplaintFetchLink();
        const result = await axios.get(URL);
        console.log(result);
      } catch (err) {}
    };

    fetch();
  }, [filters]);

  const generateComplaintFetchLink = () => {
    let baseUrl = `http://localhost:5000/api/v1/complaints/fetchSuper/${currentUser._id}`;
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

    if (filters.aadhar) {
      url.searchParams.set("aadhar", filters.aadhar);
    }

    return url.toString();
  };

  return (
    <div className="flex-col w-[300px] items-center bg-white rounded-sm shadow-sm border border-gray-300 py-3 px-1 text-center m-[8px]">
      <h3 className="text-gray-900 font-medium text-sm md:text-base text-center">
        Filter
      </h3>
      <hr />

      <label className=" text-gray-700 text-sm font-bold mb-2 mt-2">
        Expected date of filing complaint:
      </label>
      <div className="flex m-4">
        <label className="  block text-gray-700 text-sm font-bold mb-2 ml-7 mr-3">
          From
        </label>
        <input
          type="date"
          name="fromDateIncident"
          value={filters.filingDate}
          onChange={handleFilterChange}
          className="shadow rounded-lg px-3 py-1 w-[8.7rem]"
        />
      </div>
      <div className="flex m-4">
        <label className="block text-gray-700 text-sm font-bold mb-2 ml-7 mr-3">
          To
        </label>
        <input
          type="date"
          name="toDateIncident"
          value={filters.filingDate}
          onChange={handleFilterChange}
          className="shadow rounded-lg px-3 py-1 w-[8.7rem]"
        />
      </div>

      <div className="mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          From date of Incident:
        </label>
        <input
          type="date"
          name="fromDateLastEdited"
          value={filters.incidentDate}
          onChange={handleFilterChange}
          className="shadow rounded-lg px-3 py-1 w-[8.7rem]"
        />
      </div>
      <div className="mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          To date of Incident:
        </label>
        <input
          type="date"
          name="toDateLastEdited"
          value={filters.incidentDate}
          onChange={handleFilterChange}
          className="shadow rounded-lg px-3 py-1 w-[8.7rem]"
        />
      </div>
      <div className="mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          District:
        </label>
        <select
          name="district"
          value={filters.district}
          onChange={handleFilterChange}
          className="px-2 py-1 shadow rounded-lg"
        >
          <option value="">Select District</option>
          {Object.keys(townTree).map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Sub-District:
        </label>
        <select
          name="subDistrict"
          value={filters.subDistrict}
          onChange={handleFilterChange}
          className="px-2 py-1 shadow rounded-lg"
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
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Aadhaar Number
        </label>
        <input
          type="text"
          className="shadow rounded-lg px-3 py-1  "
          name="aadhar"
          onChange={handleFilterChange}
        />
      </div>
    </div>
  );
}

export default Filterbar;
