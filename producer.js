const express = require("express");
const { Queue } = require("bullmq");

const notificationQueue = new Queue("notification");

const app = express();

app.use(express.json());

app.post("/enque", sendMail);

app.listen(3000, () => {
  console.log("Producer server started");
});

async function sendMail(req, res) {
  const email = req.body.email;
  const message = req.body.message;
  const subject = req.body.subject;
  const html = req.body.html;

  console.log("Got enque request for ", email);

  await notificationQueue.add(`email to ${email}`, {
    email,
    subject,
    message,
    html,
  });

  res.status(200).json({
    message: "Email queued",
  });
}
