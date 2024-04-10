import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
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
const socket = io("http://localhost:5000");

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();
  const [complaints, setComplaintList] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const isWideScreen = useMediaQuery("(min-width: 500px)");
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
    <div className="w-full">
      <Intro />
      <div>
        <Toaster />
      </div>
      <div className="w-full py-1 px-2 shadow flex justify-evenly items-center">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/register/new">Register</NavLink>
        <NavLink to="/mycomplaints">My Complaints</NavLink>
        <NavLink to="/complaints/dashboard">police</NavLink>

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
      </div>
      <Routes>
        <Route
          path="/complaints/dashboard"
          element={
            <div className="w-[100%] flex gap-3 select-none">
              <div
                onClick={() => setIsVisible((pre) => !pre)}
                className="absolute top-0 left-0 text-2xl cursor-pointer"
              >
                <IoFilter />
              </div>
              <Filterbar
                setIsVisible={setIsVisible}
                isVisible={isVisible}
                complaints={complaints}
                setComplaintList={setComplaintList}
                currentUser={currentUser}
                filters={filters}
                setFilters={setFilters}
              />
              <Displaybar
                setFilters={setFilters}
                complaints={complaints}
                setComplaintList={setComplaintList}
                myComplaints={false}
                heading={"Complaints"}
              />
            </div>
          }
        />
        <Route
          path="/register/new"
          element={
            <div className="w-full flex justify-center items-center">
              <ComplaintForm currentUser={currentUser} />
            </div>
          }
        />
        <Route
          path="/mycomplaints"
          element={
            <div className="w-full flex justify-center items-center">
              <UserDashboard currentUser={currentUser} myComplaints={true} setFilters={setFilters} heading={"My Complaints"} />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <Login
              currentUser={currentUser}
              socket={socket}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/professionalDashboard"
          element={<Login currentUser={currentUser} />}
        />
      </Routes>
    </div>
  );
}

export default App;
