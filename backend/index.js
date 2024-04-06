const { dbConnect } = require("./config/db");
const express = require("express");
const expressFileUploader = require("express-fileupload");
const cors = require("cors");
const cron = require("node-cron");

const signIn = require("./routes/signUp.js");
const logIn = require("./routes/logIn.js");
const townTreeFetch = require("./routes/townTreeFetch");
const otpHandler = require("./routes/sendOtp.js");
const complainant = require("./routes/complaints.js");
const { initSocket } = require("./socket.js");
const {cdnConnect} = require("./config/cdn.js")

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(
  expressFileUploader({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(cors());

cron.schedule("0 0 * * *", async () => {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  await otpModel.deleteMany({ createdAt: { $lt: twentyFourHoursAgo } });
  console.log("Old OTP data deleted");
});

app.use("/api/v1", signIn);
app.use("/api/v1", logIn);
app.use("/api/v1", townTreeFetch);
app.use("/api/v1", otpHandler);
app.use("/api/v1/complaints", complainant);

dbConnect();
cdnConnect();
const { server, io } = initSocket(app);
server.listen(process.env.PORT, () => console.log("Listened to Port"));
module.exports.io = io;
