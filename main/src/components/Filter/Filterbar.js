import React, { useState, useEffect } from "react";
import axios from "axios";

function Filterbar({ onFilter }) {
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
    generateComplaintFetchLink();
  }, [filters]);

  const generateComplaintFetchLink = (baseUrl, queryParams) => {
    const url = new URL(baseUrl);
  
    // Add pagination parameters
    if (queryParams.page) {
      url.searchParams.set('page', toString(queryParams.page));
    }
  
    if (queryParams.limit) {
      url.searchParams.set('limit', toString(queryParams.limit));
    }
  
    // Add filter parameters
    if (queryParams.fromDateIncident) {
      url.searchParams.set('fromDateIncident', queryParams.fromDateIncident);
    }
  
    if (queryParams.toDateIncident) {
      url.searchParams.set('toDateIncident', queryParams.toDateIncident);
    }
  
    if (queryParams.fromDateLastEdited) {
      url.searchParams.set('fromDateLastEdited', queryParams.fromDateLastEdited);
    }
  
    if (queryParams.toDateLastEdited) {
      url.searchParams.set('toDateLastEdited', queryParams.toDateLastEdited);
    }
  
    if (queryParams.district) {
      url.searchParams.set('district', queryParams.district);
    }
  
    if (queryParams.subdistrict) {
      url.searchParams.set('subdistrict', queryParams.subdistrict);
    }
  
    if (queryParams.aadhar) {
      url.searchParams.set('aadhar', queryParams.aadhar);
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

      <label className="block text-gray-700 text-sm font-bold mb-2 ml-7 mr-3">To</label>
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
        <input type="text" className="shadow rounded-lg px-3 py-1  " name="aadhar" onChange={handleFilterChange}/>
      
      </div>
    </div>
  );
}

export default Filterbar;
