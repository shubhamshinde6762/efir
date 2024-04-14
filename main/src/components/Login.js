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
      className="w-full flex justify-center items-center h-[92vh] overflow-clip bg-gradient-to-br from-orange-100 via-sky-50 to-green-100"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 1, y: -100 }}
      transition={{ duration: 0.1 }}
    >
      {/* <div className="absolute w-screen h-screen top-0 left-0 -z-10 overflow-clip">
        <img
          className=" object-cover w-screen h-screen blur-[5px] rounded-sm  overflow-clip "
          src="https://res.cloudinary.com/dd6sontgf/image/upload/v1712804750/2151228104_pbw3jw.jpg"
          alt="background"
        />
      </div> */}
      <div className="m-5 ">
        <motion.img
          initial={{ y: 100, opacity: 0, rotate: 30, x: -100 }}
          animate={{ y: 0, opacity: 1, rotate: 0, x: 0 }}
          exit={{ opacity: 0, rotate: -90, x: -500 }}
          transition={{ delay: 0.1, duration:0.5}}
          className="min-w-[200px]"
          src="https://res.cloudinary.com/dd6sontgf/image/upload/v1713013132/pngwing.com_jvwy32.png"
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
