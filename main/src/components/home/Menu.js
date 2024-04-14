import React, { useState, useEffect, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const Menu = ({ currentUser, setCurrentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const clickHandler = (event) => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative xs:block hidden select-none">
      <div onClick={clickHandler}>
        <HiMenu />
      </div>

      {isOpen ? (
        <div
          onClick={() => setIsOpen(false)}
          className=" bg-white bg-opacity-60 text-sm min-w-48 flex flex-col text-black justify-center items-center text-center shadow-lime-200 hover:scale-105 shadow-xl py-2 transition-all duration-1000 rounded-lg px-2 space-y-0 max-w-84 absolute right-1 top-12  z-50"
          ref={dropdownRef}
        >
          {currentUser && currentUser.role === "super" ? (
            <NavLink className={" hover:bg-orange-200 py-2 rounded-lg w-full transition-all duration-200"} to="/complaints/dashboard">Dashboard</NavLink>
          ) : (
            currentUser && <NavLink to="/mycomplaints">My Complaints</NavLink>
          )}
          {currentUser ? (
            <div
              onClick={() => {
                setCurrentUser();
                localStorage.clear();
              }}
              className={" hover:bg-orange-200 py-2 rounded-lg w-full transition-all duration-200"}
            >
              LogOut
            </div>
          ) : (
            <NavLink className={" hover:bg-orange-200 py-2 rounded-lg w-full transition-all duration-200"} to="/login">Login</NavLink>
          )}
          <NavLink className={" hover:bg-orange-200 py-2 rounded-lg w-full transition-all duration-200"} to="/register">About</NavLink>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Menu;
