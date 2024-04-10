import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import Login from "./components/Login";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import ComplaintForm from "./components/ComplaintForm/ComplaintForm";
import { IoFilter } from "react-icons/io5";
import io from "socket.io-client";
import UserDashboard from "./components/userDash/UserDashboard";
import Filterbar from "./components/Filter/Filterbar";
import { useMediaQuery } from "@react-hook/media-query";
import Intro from "./Intro";
import Displaybar from "./components/Display/Displaybar";
import Home from "./components/home/Home";
const socket = io("http://localhost:5000");

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();
  const [complaints, setComplaintList] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const isWideScreen = useMediaQuery("(min-width: 500px)");
  const [renderUi, setRenderUi] = useState(false);

  const [filters, setFilters] = useState({
    fromDateIncident: "",
    toDateIncident: "",
    fromDateLastEdited: "",
    toDateLastEdited: "",
    district: "",
    subDistrict: "",
    uniqueUserId: "",
    status: "",
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setRenderUi(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsVisible(isWideScreen);
  }, [isWideScreen]);

  useEffect(async () => {
    const autoLogin = async () => {
      try {
        console.log(localStorage.getItem("token"));
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/v1/login", {
          headers: {
            Authorization: `${token}`,
          },
        });

        console.log("autoLogin", response);
        if (response.data) {
          setCurrentUser(response.data.data);
          socket.emit("login", {
            userId: response.data.data._id,
            socketId: socket.id,
          });
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Axios request error:", error);
      }
    };

    autoLogin();
  }, []);
  return (
    <motion.div // Wrap your main div with motion.div for overall page animations
      initial={{ opacity: 0 }} // Initial animation state
      animate={{ opacity: 1 }} // Animation state when component mounts
      exit={{ opacity: 0 }} // Animation state when component unmounts
    >
      <Intro />
      {renderUi && (
        <div className="w-full">
          <div>
            <Toaster />
          </div>
          <nav className="w-full z-50  rounded-b-xl font-poppins py-1 px-2 bg-white bg-opacity-15 text-white font-bold flex justify-evenly items-center">
            <NavLink to="/">
              <img
                className="w-36"
                src="https://res.cloudinary.com/dd6sontgf/image/upload/v1712742588/efir-high-resolution-logo-transparent-removebg-preview_ynbiu0.png"
              ></img>
            </NavLink>
            <NavLink to="/register">
              <div className="">Register</div>
            </NavLink>
            {currentUser &&
              (currentUser.role === "super" ? (
                <NavLink to="/complaints/dashboard">Dashboard</NavLink>
              ) : (
                <NavLink to="/mycomplaints">My Complaints</NavLink>
              ))}

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
          </nav>
          <Routes>
            <Route
              path="/complaints/dashboard"
              element={
                <motion.div
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -100 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-3 w-full select-none"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => setIsVisible((pre) => !pre)}
                    className="absolute w-full top-0 left-0 text-2xl cursor-pointer"
                  >
                    <IoFilter />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="w-fit"
                  >
                    <Filterbar
                      setIsVisible={setIsVisible}
                      isVisible={isVisible}
                      complaints={complaints}
                      setComplaintList={setComplaintList}
                      currentUser={currentUser}
                      filters={filters}
                      setFilters={setFilters}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                  >
                    <Displaybar
                    filters={filters}
                      setFilters={setFilters}
                      complaints={complaints}
                      setComplaintList={setComplaintList}
                      currentUser={currentUser}
                    />
                  </motion.div>
                </motion.div>
              }
            />
            <Route
              path="/register"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  s
                  transition={{ duration: 0.5 }}
                  className="w-full flex justify-center items-center"
                >
                  <ComplaintForm currentUser={currentUser} />
                </motion.div>
              }
            />
            <Route
              path="/mycomplaints"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full flex justify-center items-center"
                >
                  <UserDashboard
                    currentUser={currentUser}
                    myComplaints={true}
                    setFilters={setFilters}
                    heading={"My Complaints"}
                  />{" "}
                </motion.div>
              }
            />
            <Route
              path="/login"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Login
                    currentUser={currentUser}
                    socket={socket}
                    setCurrentUser={setCurrentUser}
                  />
                </motion.div>
              }
            />
            <Route
              path="/professionalDashboard"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Login currentUser={currentUser} />
                </motion.div>
              }
            />

            <Route path="/" element={<Home currentUser={currentUser} />} />
          </Routes>
        </div>
      )}
    </motion.div>
  );
}

export default App;
