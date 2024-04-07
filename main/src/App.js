import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import ComplaintForm from "./components/ComplaintForm/ComplaintForm";

import io from "socket.io-client";
import UserDashboard from "./components/userDash/UserDashboard";
import Filterbar from "./components/Filter/Filterbar";
import Displaybar from "./components/Display/Displaybar";
const socket = io("http://localhost:5000");

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();

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
      <div>
        <Toaster />
      </div>
      <div className="w-full py-1 px-2 shadow flex justify-evenly items-center">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/register/new">Register</NavLink>
        <NavLink to="/mycomplaints">My Complaints</NavLink>
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
            <div className="w-full flex ">
              <Filterbar currentUser={currentUser}/>
              <Displaybar/>
            </div>
          }/>
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
              <UserDashboard currentUser={currentUser} />
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
          element={
            <Login
              currentUser={currentUser}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
