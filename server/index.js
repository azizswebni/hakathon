//initialize the MQTT client
const mqtt = require("mqtt");
var client = mqtt.connect("mqtt://io.adafruit.com", {
  username: "Azizs",
  password: "aio_UGIX92C5LCm5UrtNVE7DXZFgZvUq",
});
//des capteurs vituelles
//qr code
client.on("connect", function () {
  console.log("Connected");
  client.publish(`${client.options.username}/f/wake`, JSON.stringify(true));
  client.subscribe(`${client.options.username}/f/bucket1`);
});

client.on("error", function (error) {
  console.log(error);
});

client.on("message", function (topic, message) {
  console.log(topic);
  console.log(message.toString());
});
///////////////
const express = require("express");
const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Started at ${port}`));

//DATABASE CONFIG

const connectDB = require("./config/db");
connectDB();

///////////////

const router = express.Router();

router.post("/", (req, res) => {});
