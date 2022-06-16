const mongoose = require("mongoose");

const bucketSchema = mongoose.Schema({
  qrcodeid: { type: String, default: "" },
  topic: { type: String, default: "" },
  current_cow_id:{type:String, default:""},
  /* cow_ids: [{
      cow_id:String,
      productionTime:String,
  }], */
});

module.exports = mongoose.model("Bucket", bucketSchema);
