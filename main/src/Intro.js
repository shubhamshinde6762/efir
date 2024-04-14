import React, { useEffect, useState } from "react";
import { ReactTyped } from "react-typed";

const Intro = () => {
  const [animationFinished, setAnimationFinished] = useState(false);
  const [animationFinished2, setAnimationFinished2] = useState(true);
  const [animationFinished3, setAnimationFinished3] = useState(true);

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setAnimationFinished2(false);
    }, 200);

    const timeout = setTimeout(() => {
      setAnimationFinished(true);
    }, 2300);

    const timeout3 = setTimeout(() => {
      setAnimationFinished3(false);
    }, 2700);

    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, []);

  return (
    <div
      className={`fixed z-50 left-0 top-0 w-screen h-screen bg-gradient-to-br from-orange-300 via-sky-100 to-lime-300 transition-opacity duration-1000 flex flex-col gap-2  justify-center items-center ${
        animationFinished ? "opacity-0" : " opacity-100"
      }
        ${animationFinished3 ? "" : "hidden w-[0px]"}`}
    >
      <h1 className=" max-w-[50%] flex justify-center items-center  text-center">
        <img
          src="https://res.cloudinary.com/dd6sontgf/image/upload/v1712569363/efir-high-resolution-logo-transparent_zl8k01.png"
          className={` w-full scale-0 duration-1000 transition-all ${
            animationFinished2
              ? "scale-[2] -rotate-45 -translate-x-[70vw]"
              : "scale-[1] translate-x-[0vw] transition-all duration-500"
          } ${
            animationFinished
              ? " opacity-0 scale-[2] rotate-45 translate-x-[70vw] "
              : " scale[1] scale-100 opacity-100"
          }`}
        ></img>
      </h1>
      <div className="text-center mx-4">
        {
          <ReactTyped
            className="text-2xl font-bold font-poppins text-indigo-600"
            strings={["Empowering Justice, One Click at a Time..."]}
            typeSpeed={25}
            backSpeed={50}
          ></ReactTyped>
        }
      </div>
    </div>
  );
};

export default Intro;
