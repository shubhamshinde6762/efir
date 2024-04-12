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
          className=" bg-black bg-opacity-30 text-sm min-w-48 flex flex-col justify-center items-center text-center shadow-sky-950 hover:scale-105 shadow-xl py-4 transition-all duration-1000 rounded-3xl px-4 space-y-3 max-w-84 absolute right-1 top-12  z-50"
          ref={dropdownRef}
        >
          {currentUser && currentUser.role === "super" ? (
            <NavLink to="/complaints/dashboard">Dashboard</NavLink>
          ) : (
            currentUser && <NavLink to="/mycomplaints">My Complaints</NavLink>
          )}
          {currentUser ? (
            <div
              onClick={() => {
                setCurrentUser();
                localStorage.clear();
              }}
            >
              LogOut
            </div>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
          <NavLink to="/register">About</NavLink>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Menu;
