const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = async () => {
  try {
    await mongoose
      .connect(process.env.URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("MongoDb Connected");
      })
      .catch((err) => console.log(err));
  } catch (err) {}
};

