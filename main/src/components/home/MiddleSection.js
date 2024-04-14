import React from "react";
import { ReactTyped } from "react-typed";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const MiddleSection = () => {
  const [ref1, inView1] = useInView({ threshold: 0.2 });
  const [ref2, inView2] = useInView({ threshold: 0.2 });
  const [ref3, inView3] = useInView({ threshold: 0.2 });
  const [ref4, inView4] = useInView({ threshold: 0.2 });
  const [ref5, inView5] = useInView({ threshold: 0.2 });

  const animationVariants = {
    hidden: { opacity: 0, y: 100, transition: { duration: 0.5 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1 } },
  };

  return (
    <div className="bg-gradient-to-b flex flex-col gap-20 py-16 from-sky-100 via-orange-100 to-amber-100 w-screen">
      <div
        ref={ref1}
        className={`flex justify-center items-center gap-10 xs:gap-4 xs:flex-wrap m-4 ${
          inView1 ? "animate__animated animate__fadeIn" : ""
        }`}
      >
        <motion.div
          initial="hidden"
          animate={inView1 ? "visible" : "hidden"}
          variants={animationVariants}
          className="flex flex-col justify-center items-center gap-1 max-w-[600px] p-6 xs:p-3"
        >
          <ReactTyped
            className="text-orange-600 font-poppins font-bold text-6xl sx:text-4xl xs:text-3xl"
            strings={["A Voice for the Voiceless"]}
            typeSpeed={40}
            backSpeed={50}
          />
          <p className="text-2xl xs:text-xl font-bold text-pretty font-barlow">
            Where silence finds strength and grievances find a resounding echo
            of justice.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView1 ? "visible" : "hidden"}
          variants={animationVariants}
        >
          <img
            className="max-h-[400px] min-w-[200px]"
            src="https://res.cloudinary.com/dd6sontgf/image/upload/v1713028790/ae32dca5f97ea99397563a4efc775dd3-removebg-preview_bs8khv.png"
            alt="Voiceless"
          />
        </motion.div>
      </div>
      <div
        ref={ref2}
        className={`flex justify-center items-center gap-10 xs:gap-4 xs:flex-wrap-reverse m-4 ${
          inView2 ? "animate__animated animate__fadeIn" : ""
        }`}
      >
        <motion.div
          initial="hidden"
          animate={inView2 ? "visible" : "hidden"}
          variants={animationVariants}
        >
          <img
            className="max-h-[400px] min-w-[200px]"
            src="https://res.cloudinary.com/dd6sontgf/image/upload/v1713028791/pngwing.com_1_c0tes9.png"
            alt="Empowering People"
          />
        </motion.div>
        <motion.div
          ref={ref3}
          initial="hidden"
          animate={inView2 ? "visible" : "hidden"}
          variants={animationVariants}
          className="flex flex-col justify-center items-center gap-1 max-w-[600px] p-6 xs:p-3"
        >
          <ReactTyped
            className="text-green-600 font-poppins font-bold text-6xl sx:text-4xl xs:text-3xl"
            strings={["Empowering People with Rights Aware"]}
            typeSpeed={40}
            backSpeed={50}
          />
          <p className="text-2xl xs:text-xl font-bold text-pretty font-barlow">
            Where hearts unite and hands intertwine, Efir sparks the flame of
            collective action, illuminating pathways to progress.
          </p>
        </motion.div>
      </div>

      <div
        ref={ref4}
        className={`flex flex-col  items-center ${
          inView3 ? "animate__animated animate__fadeIn" : ""
        }`}
      >
        <p className="text-center">
          <ReactTyped
            className="text-violet-600 font-poppins text-center font-bold text-7xl sx:text-5xl xs:text-4xl"
            strings={["Why Efir Matters ?"]}
            typeSpeed={40}
            backSpeed={50}
          />
        </p>

        <div className="flex justify-center gap-10 xs:gap-4 xs:flex-wrap m-4 ">
          <motion.div
            ref={ref5}
            initial="hidden"
            animate={inView4 ? "visible" : "hidden"}
            variants={animationVariants}
            className="flex flex-col  items-center text-center text-pretty gap-1 max-w-[600px] p-6 xs:p-3"
          >
            <ReactTyped
              className="text-orange-600 font-poppins font-bold text-6xl sx:text-4xl xs:text-3xl"
              strings={["Fear-Free FIR Filing"]}
              typeSpeed={40}
              backSpeed={50}
            />
            <p className="text-2xl xs:text-xl font-bold text-pretty font-barlow">
              Despite 10000+ FIR cases reported daily in India, many hesitate to
              file due to fear or distrust. Efir eliminates barriers by allowing
              anonymous filing, ensuring every voice is heard without fear of
              reprisal.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={inView4 ? "visible" : "hidden"}
            variants={animationVariants}
            className="flex flex-col items-center text-center text-pretty gap-1 max-w-[600px] p-6 xs:p-3"
          >
            <ReactTyped
              className="text-blue-600 font-poppins font-bold text-6xl sx:text-4xl xs:text-3xl"
              strings={["Unbiased Processing"]}
              typeSpeed={40}
              backSpeed={50}
            />
            <p className="text-2xl xs:text-xl font-bold text-pretty font-barlow">
              Efir guarantees impartiality in handling each FIR, irrespective of
              demographics or status. With fairness at its core, every case is
              treated equally, fostering trust and confidence in the legal
              system.
            </p>
          </motion.div>
        </div>
        <motion.div
          initial="hidden"
          animate={inView4 ? "visible" : "hidden"}
          variants={animationVariants}
          className="flex flex-col items-center  max-w-[1000px] text-center text-pretty gap-1  p-6 xs:p-3"
        >
          <ReactTyped
            className=" text-lime-600 font-poppins font-bold text-6xl sx:text-4xl xs:text-3xl"
            strings={["Seamless Evidence Submission"]}
            typeSpeed={40}
            backSpeed={50}
          />
          <p className="text-2xl xs:text-xl font-bold text-pretty font-barlow">
            Efir facilitates online evidence submission, expediting the process
            and ensuring prompt access to crucial information for law
            enforcement. By streamlining procedures, it empowers citizens to
            play an active role in promoting accountability and transparency in
            justice.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default MiddleSection;
