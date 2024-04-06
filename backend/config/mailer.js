const nodemailer = require("nodemailer");

exports.transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "sstar0wifi@gmail.com",
    pass: "wwrkqwnkuknrjpaf", 
  },
}); 