const mongoose = require("mongoose");

const cowprodSchema = mongoose.Schema({
  cow_num:Number,
  body:[{
    time: { type: Date , default:Date.now() },
    ph: { type: Number },
    temperature: { type: Number },
    level: { type: Number},
  }]
});

module.exports = mongoose.model("Cowprod", cowprodSchema);
