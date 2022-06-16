const mongoose = require("mongoose");

const CowSchema = mongoose.Schema({
  num:Number,
});

module.exports = mongoose.model("Cow", CowSchema);
