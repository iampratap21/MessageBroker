const { Worker } = require("bullmq");
const nodemailer = require("nodemailer");
const IORedis = require("ioredis");
require("dotenv").config();

const connection = new IORedis({
  maxRetriesPerRequest: null,
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.MAIL_USER,
  to: undefined,
  subject: "checking the message broker",
  html: "<b>Let's see this in bold",
};

const sendEmailIn = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("mail has been sent");
  } catch (err) {
    console.log("Couldn't send email bcz of : ", err);
  }
};

const worker = new Worker(
  "notification",
  async (job) => {
    console.log(`Message received from job id : ${job.id}`);
    console.log("Processing");
    console.log(`Sending email to ${job.data.email}`); // 2nd arg's member available in job.data
    mailOptions["to"] = [job.data.email];
    mailOptions["html"] = job.data.html;
    mailOptions["subject"] = job.data.subject;
    await sendEmailIn(transporter, mailOptions);
    console.log("Email sent");
  },
  { connection }
);
