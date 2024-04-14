import React, { useState, useEffect, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { motion } from "framer-motion";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Menu = ({ currentUser, setCurrentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const clickHandler = (event) => {
    setIsOpen(!isOpen);
  };
  const handleSmoothScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
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
          className=" bg-white bg-opacity-90 text-sm min-w-48 flex flex-col text-black justify-center items-center text-center shadow-lime-200 hover:scale-105 shadow-xl py-2 transition-all duration-1000 rounded-lg px-2 space-y-0 max-w-84 absolute right-1 top-12  z-50"
          ref={dropdownRef}
        >
          <NavLink
            className={
              " hover:bg-orange-200 py-2 rounded-lg w-full transition-all duration-200"
            }
            to="/enquire"
          >
            Enquiry
          </NavLink>
          {currentUser && currentUser.role === "super" ? (
            <NavLink
              className={
                " hover:bg-orange-200 py-2 rounded-lg w-full transition-all duration-200"
              }
              to="/complaints/dashboard"
            >
              Dashboard
            </NavLink>
          ) : (
            currentUser && <NavLink to="/mycomplaints">My Complaints</NavLink>
          )}
          <a
            className={
              " hover:bg-orange-200 py-2 rounded-lg w-full transition-all duration-200"
            }
            onClick={(e) => {
              e.preventDefault();
              if (location.pathname !== "/") navigate("/#about");
              handleSmoothScroll("about");
            }}
            href="#about"
          >
            About
          </a>
          {currentUser ? (
            <div
              onClick={() => {
                setCurrentUser();
                localStorage.clear();
              }}
              className={
                " hover:bg-orange-200 py-2 rounded-lg w-full transition-all duration-200"
              }
            >
              LogOut
            </div>
          ) : (
            <NavLink
              className={
                " hover:bg-orange-200 py-2 rounded-lg w-full transition-all duration-200"
              }
              to="/login"
            >
              Login
            </NavLink>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Menu;
