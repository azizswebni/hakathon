const mongoose = require("mongoose");

const  NotificationSchema = mongoose.Schema({
  notification: {
    title: String,
    body: String,
    sound:String,
},
data: {
    title: String,
    body: String
},
});

module.exports = mongoose.model("Notifications", NotificationSchema);