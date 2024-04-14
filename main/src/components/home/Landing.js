import React from "react";
import { ReactTyped } from "react-typed";
import { motion } from "framer-motion";

const Landing = ({}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-screen select-none bg-gradient-to-b gap-5 via-amber-100 from-orange-200 to-sky-100 relative h-screen overflow-hidden flex xs:flex-col-reverse justify-center items-center"
    >
      {/* <motion.img
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0 }}
        className="object-cover h-screen max-w-[100vw] w-screen overflow-hidden left-0 top-0 absolute -z-10"
        src="https://res.cloudinary.com/dd6sontgf/image/upload/v1712744608/2151228100_aje1od.jpg"
        alt="Background Image"
      /> */}
      <div className="m-5 ">
        <motion.img
          initial={{ y: 100, opacity: 0, rotate: 30, x: -100 }}
          animate={{ y: 0, opacity: 1, rotate: 0, x: 0 }}
          exit={{ opacity: 0, rotate: -90, x: -500 }}
          transition={{ delay: 0.5 }}
          className="min-w-[200px]"
          src="https://res.cloudinary.com/dd6sontgf/image/upload/v1713011894/Human-Right_bg-1-removebg-preview_khjcvk.png"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ delay: 0.5 }}
        className="bg-white max-w-[55%] m-5 flex flex-col  xs:max-w-max xs:w-5/6 overflow-hidden h-fit  w-[700px] mr-10 rounded-xl p-6 xs:p-4 bg-opacity-30"
      >
        <motion.img
          initial={{ y: 100, opacity: 0, rotate: -60 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: -90 }}
          transition={{ delay: 0.6 }}
          className="max-w-[200px] xs:max-w-[120px]"
          src="https://res.cloudinary.com/dd6sontgf/image/upload/v1712747549/_Pngtree_law_and_justice_illustration_3718775-removebg-preview_krbxyh.png"
        />
        <p className="text-pretty flex w-full flex-col font-poppins font-bold text-white text-4xl sx:text-3xl xs:text-xl">
          <span className="text-orange-500">Empowering Your Rights,</span>
          <ReactTyped
            className="text-lime-600 text-5xl sx:text-4xl xs:text-2xl"
            strings={[
              "Championing Accountability",
              "Defending Equality",
              "Advocating for Change",
              "Promoting Fairness",
            ]}
            typeSpeed={40}
            backSpeed={50}
            loop
          />
        </p>
        <p className="text-xl xs:text-base my-4 font-lora font-bold text-slate-500">
          Welcome to{" "}
          <span className=" text-orange-600 text-3xl xs:text-xl ">efir</span>,
          the bastion of justice, endorsed by the government to safeguard your
          rights and ensure justice throughout our nation.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Landing;
