//initialize the MQTT client
const mqtt = require("mqtt");
var client = mqtt.connect("mqtt://io.adafruit.com", {
  username: "azizsss123",
  password: "aio_gaJb63OVVu1L5OnnFBhimwgIEs55",
});
//des capteurs vituelles
//qr code
client.on("connect", function () {
  console.log("Connected");
  client.publish(`${client.options.username}/f/wake`, JSON.stringify(true));
  client.subscribe(`${client.options.username}/f/bucket1`);
  client.subscribe(`${client.options.username}/f/bucket2`);
});

client.on("error", function (error) {
  console.log(error);
});

const bucket = require("./models/bucket");
const cow = require("./models/cow");
const cowprod = require("./models/cow_production");
client.on("message", function (topic, message) {
  console.log(topic);
  console.log(message.toString());
  bucket
    .findOne({ topic: topic })
    .then((bk) => {
      if (bk) {
        console.log(bk);
        cowprod.findOne({ cow_num: bk.current_cow_id }).then((cp) => {
          console.log(cp);
          const newbody = cp.body;
          newbody.push(JSON.parse(message.toString()));
          cowprod.findByIdAndUpdate(cp._id, { body: newbody }).then(() => {
            console.log("success");
          });
        });
      } else {
        const newbuck = new bucket({
          topic: topic,
          current_cow_id: parseInt(topic.charAt(topic.length - 1)),
        });

        const newcowprod = new cowprod({
          cow_num: parseInt(topic.charAt(topic.length - 1)),
          body: [JSON.parse(message.toString())],
        });

        const newcow = new cow({
          num: parseInt(topic.charAt(topic.length - 1)),
        });
        newbuck.save();
        newcowprod.save();
        newcow.save();
      }
    })
    .catch((err) => console.log(err));
  /* const nh = new history({
   );
  nh.save().then(() => {
   
  }); */
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

app.post("/get_cow_history/", (req, res) => {
  const id = req.body.topic;
  bucket.findOne({ topic: id }).then((bk) => {
    if (bk) {
      cowprod.findOne({ cow_num: bk.current_cow_id }).then((cowpro) => {
        
          console.log(cowpro);
        res.status(200).json(cowpro);
        
      });
    } else {
      res.status(404).send("cow not found");
    }
  });
});

app.post("/set_mode",(req,res)=>{
  const {cow_id,topic} =  req.body;
  console.log(cow_id,topic);
  client.publish(`${client.options.username}/f/wake`, JSON.stringify(true));
  bucket.findOneAndUpdate({topic:topic},{current_cow_id:cow_id}).then(()=>{
    res.status(200).send("successfully wake up mode on");
  })
})