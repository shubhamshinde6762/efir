import React, { useEffect, useState, useRef } from "react";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

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
          .post("http://localhost:5000/api/v1/sendOtp", {
            email: userDetails.mobile,
            socketId: socket.id,
          })
          .then(() => setOtpSentFlag(true))
          .catch((error) => {
            throw error; // Rethrow the error to handle it in the toast.promise
          }),
        {
          loading: "Sending Otp...",
          success: (response) => {
            console.log(response);
            return <b>Media Sent!</b>;
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
      const response = await axios.post(
        "http://localhost:5000/api/v1/verifyOtp",
        {
          email: userDetails.mobile,
          socketId: socket.id,
          OTP,
        }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.data.token);
        setCurrentUser(response.data.data);
        socket.emit("login", {
          userId: response.data.data._id,
          socketId: socket.id,
        });
        navigate(`/`);
      } else {
        setCurrentUser("");
      }

      if (response) navigate("/");
    } catch (err) {}
  };

  const LogInHandler = async () => {
    try {
      let email = null;
      if (!isNumber(userDetails.mobile)) email = userDetails.mobile;

      const response = await axios.post(
        "http://localhost:5000/api/v1/login",
        userDetails,
        email
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.data.token);
        setCurrentUser(response.data.data);
        socket.emit("login", {
          userId: response.data.data._id,
          socketId: socket.id,
        });
        navigate(`/`);
      } else {
        setCurrentUser("");
      }
    } catch (error) {
      const { response } = error;
    }
  };

  function isNumber(input) {
    return /^\d+$/.test(input);
  }

  // function isEmail(input) {
  //   return /\S+@\S+\.\S+/.test(input);
  // }

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
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col items-center shadow p-10 gap-2 py-4 rounded-xl min-w-[280px] w-[30%]">
        <div className="w-fit text-xl font-bold">Login</div>
        <div className="w-full flex  justify-center cursor-pointer items-center py-2 bg-slate-100 px-3 rounded-2xl">
          <div
            onClick={() => setLoginMode("password")}
            className={`flex-grow transition-all duration-300 text-center px-2  ${
              loginMode === "password"
                ? "bg-gray-200 shadow rounded-full scale-105"
                : "text-gray-700"
            }`}
          >
            <p>Login with Password</p>
          </div>
          <div
            onClick={() => setLoginMode("otp")}
            className={`flex-grow  transition-all duration-300  text-center px-2  ${
              loginMode === "otp"
                ? "bg-gray-200 shadow rounded-full scale-105"
                : "text-gray-700"
            }`}
          >
            <p>Login with Otp</p>
          </div>
        </div>
        <div className="w-full">
          <p>{loginMode == "password" ? "Email/Mobile" : "Email"}</p>
          <input
            placeholder={loginMode === "password" ? "Email/Mobile" : "Email"}
            id="mobile"
            value={userDetails["mobile"]}
            name="mobile"
            onChange={changeHandler}
            className="px-2 py-1 bg-gray-100 rounded-lg shadow w-full"
          />
        </div>

        {loginMode === "password" ? (
          <div className="w-full relative">
            <p>Password</p>
            <input
              placeholder="password"
              type={pVisible.password ? "text" : "password"}
              id="password"
              value={userDetails["password"]}
              name="password"
              onChange={changeHandler}
              className="px-2 py-1 bg-gray-100 rounded-lg shadow w-full"
            />
            <label
              id="password"
              className="absolute right-2 top-8"
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
              className="w-fit text-center px-2 py-1 bg-green-500 shadow-inner  text-white rounded-xl transition-all duration-500 hover:bg-green-600 hover:scale-105"
            >
              Send Otp
            </div>
            {isOtpSent && (
              <div className="w-full">
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
                      className="px-2 py-1 text-center bg-gray-100 rounded-lg shadow w-full"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {(loginMode === "password" || isOtpSent) && (
          <div className="w-full">
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
            className="w-fit text-center px-2 py-1 bg-green-500 shadow-inner  text-white rounded-xl transition-all duration-500 hover:bg-green-600 hover:scale-105"
          >
            Login
          </div>
        )}
        <div>
          Don't have an account?{" "}
          <span
            onClick={() => setLogin((state) => !state)}
            className="text-sky-600 cursor-pointer "
          >
            SignUp Here
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginDiv;
