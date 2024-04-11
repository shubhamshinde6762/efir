import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoginDiv from "./LoginComponents/LoginDiv";
import SigninDiv from "./LoginComponents/SigninDiv";
import { useNavigate } from "react-router-dom";

const Login = ({ socket, currentUser, setCurrentUser }) => {
  const [loginSwitch, setLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const validity = () => {
      try {
        if (currentUser) navigate("/");
      } catch (err) {}
    };
    console.log(currentUser);

    validity();
  }, [currentUser]);

  return (
    <motion.div
      className="w-full flex justify-center items-center h-[85vh] overflow-clip"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 1, y: -100 }}
      transition={{ duration: 0.1 }}
    >
      <div className="absolute w-screen h-screen top-0 left-0 -z-10 overflow-clip">
        <img
          className=" object-cover w-screen h-screen blur-[5px] rounded-sm  overflow-clip "
          src="https://res.cloudinary.com/dd6sontgf/image/upload/v1712804750/2151228104_pbw3jw.jpg"
          alt="background"
        />
      </div>
      {loginSwitch ? (
        <LoginDiv
          setLogin={setLogin}
          socket={socket}
          setCurrentUser={setCurrentUser}
        />
      ) : (
        <SigninDiv
          setLogin={setLogin}
          socket={socket}
          setCurrentUser={setCurrentUser}
        />
      )}
    </motion.div>
  );
};

export default Login;
