import React, { useEffect, useState } from "react";
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
    console.log(currentUser)

    validity();
  }, [currentUser]);

  return (
    <div className="w-full">
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
    </div>
  );
};

export default Login;
