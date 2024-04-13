import React,{useState} from 'react';
import { FiSearch } from "react-icons/fi";
const SearchBar = () => {
    const [firId, setFirId] = useState("")
    const searchHandler = ()=>{
        console.log(firId)
    }
  return (
    <div className="flex items-start justify-center h-screen bg-gray-100 p-3">
      <div className="bg-white shadow-md rounded-full flex items-center w-[40%]">
        <input
          type="text"
          placeholder="Search..."
          value={firId}
          className="py-2 px-4 w-full focus:outline-none rounded-full"
          onChange={(e)=>{setFirId(e.target.value)}}
        />
        <button className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-full text-2xl ml-2" onClick={searchHandler}>
        <FiSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
