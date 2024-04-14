import React from "react";
import Landing from "./Landing";
import GenAi from "./GenAi";
import { motion } from "framer-motion";
import {
  Routes,
  Route,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import Menu from "./Menu";
import MiddleSection from "./MiddleSection";
import Footer from "./Footer";

const Home = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleSmoothScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <div className="  flex flex-col gap-0 top-0 left-0 w-screen overflow-x-clip">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className={
          " z-[60] fixed custom-scrollbar rounded-b-2xl w-full mx-1 font-poppins py-1  bg-amber-200 bg-opacity-10 text-indigo-500 font-bold flex justify-between px-4 items-center"
        }
      >
        <NavLink to="/">
          <motion.img
            initial={{ scale: 10 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="w-36"
            src="https://res.cloudinary.com/dd6sontgf/image/upload/v1712742588/efir-high-resolution-logo-transparent-removebg-preview_ynbiu0.png"
            alt="logo"
          />
        </NavLink>
        <div className="flex justify-center items-center gap-7 xs:gap-3 xs:text-base xs:mx-1 mx-4">
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/enquire" className={"xs:hidden"}>
            Enquiry
          </NavLink>
          {currentUser && currentUser.role === "super" ? (
            <NavLink className={"xs:hidden"} to="/complaints/dashboard">
              Dashboard
            </NavLink>
          ) : (
            currentUser && (
              <NavLink className={"xs:hidden"} to="/mycomplaints">
                My Complaints
              </NavLink>
            )
          )}
          <a
            onClick={(e) => {
              e.preventDefault();
              if (location.pathname !== "/") navigate("/#about");
              handleSmoothScroll("about");
            }}
            href="#about"
            className={"xs:hidden"}
          >
            About
          </a>
          {currentUser ? (
            <div
              onClick={() => {
                setCurrentUser("");
                localStorage.clear();
              }}
              className="cursor-pointer xs:hidden"
            >
              LogOut
            </div>
          ) : (
            <NavLink className={"xs:hidden"} to="/login">
              Login
            </NavLink>
          )}
          <Menu currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </div>
      </motion.nav>
      <Landing />
      <MiddleSection />

      <GenAi />
      <Footer />
    </div>
  );
};

export default Home;
