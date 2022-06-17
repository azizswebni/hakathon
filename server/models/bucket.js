const mongoose = require("mongoose");

const bucketSchema = mongoose.Schema({
  qrcodeid: { type: String },
  topic: { type: String },
  current_cow_id:{type:Number},
  
});

module.exports = mongoose.model("Bucket", bucketSchema);
