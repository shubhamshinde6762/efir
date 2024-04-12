import React from "react";
import { MdArrowBack } from "react-icons/md";

const FirId = ({ displayFirId, setDisplayFirId }) => {
  return (
    <div className="bg-white relative flex flex-col items-center gap-2 min-w-[250px] font-poppins rounded-xl px-4 py-5">
      <MdArrowBack
        onClick={() => setDisplayFirId()}
        className="absolute -left-2 z-[6] -top-2 cursor-pointer hover:bg-red-700 transition-all duration-300 hover:scale-105 text-white text-3xl rounded-full p-1 bg-red-500"
      />
      <div className="text-xl font-bold">Fir Filed Successfully !</div>
      <div className="text-md">
        {" "}
        Fir Id : <span className="font-bold">{displayFirId}</span>
      </div>
    </div>
  );
};

export default FirId;
