import React, { useState, useEffect, useRef } from "react";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import FirId from "../ComplaintForm/FirId";

const LoginDiv = ({ setCurrentUser, socket, setLogin }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loginMode, setLoginMode] = useState("password");
  const [isOtpSent, setOtpSentFlag] = useState(false);
  const [pVisible, setPVisible] = useState({
    password: false,
    cpassword: false,
  });
  const refs = useRef(Array.from({ length: 6 }, () => null));
  const [userDetails, setUserDetails] = useState({
    mobile: "",
    password: "",
    RememberMe: false,
  });
  const navigate = useNavigate();

  const sentOtpHandler = async () => {
    try {
      await toast.promise(
        axios
          .post("https://efir-ecru.vercel.app/api/v1/sendOtp", {
            email: userDetails.mobile,
            socketId: socket.id || 1234,
          })
          .then(() => setOtpSentFlag(true))
          .catch((error) => {
            throw error; // Rethrow the error to handle it in the toast.promise
          }),
        {
          loading: "Sending Otp...",
          success: (response) => {
            console.log(response);
            return <b>OTP Sent!</b>;
          },
          error: (error) => {
            console.error(error);
            if (error.response && error.response.status === 401) {
              return <b>Unauthorized: Please login again.</b>;
            } else {
              return <b>Error while Sending.</b>;
            }
          },
        }
      );
    } catch (err) {
      // Handle any other errors outside of toast.promise
      console.error(err);
    }
  };

  const otpLogin = async () => {
    try {
      let OTP = "";
      for (let i = 0; i < 6; i++) {
        console.log(OTP);
        if (otp[i] !== "") OTP += otp[i];
        else return;
      }

      console.log(OTP);

      const response = await toast.promise(
        axios.post("https://efir-ecru.vercel.app/api/v1/verifyOtp", {
          email: userDetails.mobile,
          socketId: socket.id || 1234,
          OTP,
        }),
        {
          loading: "Verifying OTP...",
          success: (data) => {
            localStorage.setItem("token", data.token);
            setCurrentUser(data.data.data);
            // socket.emit("login", {
            //   userId: data.data.data._id,
            //   socketId: socket.id,
            // });
            navigate(`/`);
            return "Login successful";
          },
          error: () => {
            setCurrentUser("");
            return "Login failed";
          },
        }
      );

      if (response) navigate("/");
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  const LogInHandler = async () => {
    try {
      let email = null;
      if (!isNumber(userDetails.mobile)) email = userDetails.mobile;

      const response = await toast.promise(
        axios.post(
          "https://efir-ecru.vercel.app/api/v1/login",
          userDetails,
          { params: { email } } // Passing email as a query parameter
        ),
        {
          loading: "Logging in...",
          success: (data) => {
            localStorage.setItem("token", data.token);
            setCurrentUser(data.data.data);
            // socket.emit("login", {
            //   userId: data.data.data._id,
            //   socketId: socket.id,
            // });
            console.log(data);
            navigate(`/`);
            return "Login successful";
          },
          error: () => {
            setCurrentUser("");
            return "Login failed";
          },
        }
      );

      if (response) navigate("/");
    } catch (error) {
      const { response } = error;
      toast.error("An error occurred");
    }
  };

  function isNumber(input) {
    return /^\d+$/.test(input);
  }

  useEffect(() => {
    console.log(userDetails);
  }, [userDetails]);

  const numChangeHandler = (event, index) => {
    const inputValue = event.target.value;
    console.log(inputValue);

    if (
      (event.nativeEvent.inputType === "deleteContentBackward" ||
        event.key === "Backspace") &&
      inputValue === ""
    ) {
      setOtp((prevState) => {
        const newState = [...prevState];
        newState[index] = "";
        return newState;
      });

      if (index > 0) {
        refs.current[index - 1].focus();
      }
      return;
    }

    if (
      inputValue !== "" &&
      (inputValue.length !== 1 ||
        isNaN(inputValue) ||
        !/^\d+$/.test(inputValue))
    ) {
      return;
    }

    setOtp((prevState) => {
      const newState = [...prevState];
      newState[index] = inputValue;
      return newState;
    });

    if (inputValue !== "" && index < 5) {
      refs.current[index + 1].focus();
    }
  };

  const changeHandler = (event) => {
    const { id, value, type, checked, name } = event.target;
    setUserDetails((state) => {
      return {
        ...state,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 0, x: 100 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 0, x: -100 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className=" flex justify-center z-10 items-center "
    >
      {}
      <div className="flex flex-col bg-white bg-opacity-50 items-center shadow p-6 m-4 gap-2 py-4 rounded-xl min-w-[280px] w-[400px]">
        <div className="w-fit text-xl text-black font-bold">Login</div>
        <div className="w-full flex   justify-center cursor-pointer items-center py-2 bg-slate-200 bg-opacity-70 px-3 rounded-2xl">
          <div
            onClick={() => setLoginMode("password")}
            className={`flex-grow transition-all duration-300 text-center px-2 py-1  ${
              loginMode === "password"
                ? "bg-gray-100 shadow font-bold rounded-full scale-105"
                : "text-gray-700"
            }`}
          >
            <p>Login with Password</p>
          </div>
          <div
            onClick={() => setLoginMode("otp")}
            className={`flex-grow  transition-all duration-300 py-1 text-center px-2  ${
              loginMode === "otp"
                ? "bg-gray-100 shadow font-bold rounded-full scale-105"
                : "text-gray-700"
            }`}
          >
            <p>Login with Otp</p>
          </div>
        </div>
        <div className="w-full text-black">
          <p>{loginMode == "password" ? "Email/Mobile" : "Email"}</p>
          <input
            placeholder={loginMode === "password" ? "Email/Mobile" : "Email"}
            id="mobile"
            value={userDetails["mobile"]}
            name="mobile"
            onChange={changeHandler}
            className="px-2 py-1 bg-gray-50  bg-opacity-20 rounded-lg shadow w-full"
          />
        </div>

        {loginMode === "password" ? (
          <div className="w-full relative text-black">
            <p>Password</p>
            <input
              placeholder="password"
              type={pVisible.password ? "text" : "password"}
              id="password"
              value={userDetails["password"]}
              name="password"
              onChange={changeHandler}
              className="px-2 py-1 bg-gray-50 bg-opacity-20 rounded-lg shadow w-full"
            />
            <label
              id="password"
              className="absolute cursor-pointer right-2 text-black top-8"
              onClick={() =>
                setPVisible((state) => {
                  state.password = !state.password;
                  return { ...state };
                })
              }
            >
              {pVisible.password ? <MdVisibility /> : <MdVisibilityOff />}
            </label>
          </div>
        ) : (
          <div className="w-full relative flex justify-center items-center mt-2 flex-col">
            <div
              onClick={sentOtpHandler}
              className="w-fit text-center px-2 py-1 bg-green-500 shadow-inner cursor-pointer text-white rounded-xl transition-all duration-500 hover:bg-green-600 hover:scale-105"
            >
              Send Otp
            </div>
            {isOtpSent && (
              <div className="w-full text-black">
                <p>Otp</p>
                <div className="flex gap-2">
                  {new Array(6).fill().map((ele, index) => (
                    <input
                      key={index}
                      ref={(el) => (refs.current[index] = el)}
                      type="text"
                      value={otp[index]}
                      onChange={(event) => numChangeHandler(event, index)}
                      inputMode="numeric"
                      className="px-2 py-1 text-center bg-gray-100 bg-opacity-65 text-black font-bold rounded-lg shadow w-full"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {(loginMode === "password" || isOtpSent) && (
          <div className="w-full text-black">
            <label
              htmlFor="RememberMe"
              className="cursor-pointer select-none text-sm flex items-center gap-1 pl-2"
            >
              <input
                type="checkbox"
                id="RememberMe"
                name="RememberMe"
                checked={userDetails["RememberMe"]}
                onChange={changeHandler}
              />
              Remember Me
            </label>
          </div>
        )}

        {(loginMode === "password" || isOtpSent) && (
          <div
            onClick={(event) => {
              if (loginMode === "password") LogInHandler(event);
              else otpLogin();
            }}
            className="w-fit text-center cursor-pointer px-2 py-1 bg-green-500 shadow-inner  text-white rounded-xl transition-all duration-500 hover:bg-green-600 hover:scale-105"
          >
            Login
          </div>
        )}
        <div className="text-black">
          Don't have an account?{" "}
          <span
            onClick={() => setLogin((state) => !state)}
            className="text-orange-400 font-bold cursor-pointer "
          >
            SignUp Here
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginDiv;
