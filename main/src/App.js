import "./App.css";
import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import Login from "./components/Login";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import ComplaintForm from "./components/ComplaintForm/ComplaintForm";
import { IoFilter } from "react-icons/io5";
// import io from "socket.io-client";
import UserDashboard from "./components/userDash/UserDashboard";
import Filterbar from "./components/Filter/Filterbar";
import { useMediaQuery } from "@react-hook/media-query";
import Intro from "./Intro";
import Displaybar from "./components/Display/Displaybar";
import { HiMenu } from "react-icons/hi";
import Home from "./components/home/Home";
import Menu from "./components/home/Menu";
import SearchBar from "./components/Anonymous/Anonymous";
// const socket = io("http://localhost:5000");
const socket = null;

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();
  const [complaints, setComplaintList] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const isWideScreen = useMediaQuery("(min-width: 500px)");
  const [renderUi, setRenderUi] = useState(false);
  const handleSmoothScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const [filters, setFilters] = useState({
    fromDateIncident: "",
    toDateIncident: "",
    fromDateLastEdited: "",
    toDateLastEdited: "",
    district: "",
    subDistrict: "",
    uniqueUserId: "",
    Categories: "",
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
        const response = await axios.get(
          "https://efir-ecru.vercel.app/api/v1/login",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        console.log("autoLogin", response);
        if (response.data) {
          setCurrentUser(response.data.data);
          // socket.emit("login", {
          //   userId: response.data.data._id,
          //   socketId: socket.id,
          // });
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Axios request error:", error);
      }
    };

    autoLogin();
  }, []);

  const location = useLocation();

  useEffect(() => {
    try {
      console.log(location);
      if (location.hash === "#about") handleSmoothScroll("about");
    } catch (err) {}
  }, [location]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className=" overflow-x-hidden custom-scrollbar"
    >
      <Intro />
      {renderUi && (
        <div className="overflow-x-hidden">
          <div>
            <Toaster />
          </div>
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className={
              location.pathname === "/"
                ? "hidden w-[0px] h-[0px]"
                : "z-20  w-full font-poppins py-1 bg-orange-200  text-violet-500 font-bold flex justify-between px-5 items-center"
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
                <NavLink
                  onClick={() => {
                    setCurrentUser();
                    localStorage.clear();
                  }}
                  className={"xs:hidden"}
                >
                  LogOut
                </NavLink>
              ) : (
                <NavLink className={"xs:hidden"} to="/login">
                  Login
                </NavLink>
              )}
              <Menu currentUser={currentUser} setCurrentUser={setCurrentUser} />
            </div>
          </motion.nav>
          <Routes>
            <Route
              path="/complaints/dashboard"
              element={
                <motion.div
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -100 }}
                  transition={{ duration: 0.2 }}
                  className="flex bg-gradient-to-b min-h-[92vh] from-orange-200 via-sky-100 to-green-200 gap-3 w-full select-none"
                >
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
                      setIsVisible={setIsVisible}
                      complaints={complaints}
                      setComplaintList={setComplaintList}
                      currentUser={currentUser}
                      heading={"Complaints"}
                      myComplaints={false}
                    />
                  </motion.div>
                </motion.div>
              }
            />
            <Route
              className="mt-10"
              path="/register"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  s
                  transition={{ duration: 0.5 }}
                  className="w-full flex bg-gradient-to-b from-orange-200 via-sky-100 to-green-200 justify-center items-center"
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
                  className="w-full flex justify-center bg-gradient-to-b from-orange-200 via-sky-100 to-green-200 items-center"
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

            <Route
              path="/"
              element={
                <Home
                  setCurrentUser={setCurrentUser}
                  currentUser={currentUser}
                />
              }
            />
            <Route
              path="/enquire"
              element={
                <motion.div>
                  <SearchBar />
                </motion.div>
              }
            />
          </Routes>
        </div>
      )}
    </motion.div>
  );
}

export default App;
