const mongoose = require("mongoose");

const cowprodSchema = mongoose.Schema({
  cow_num:Number,
  body:[{
    time: { type: String },
    temp: { type: Number },
    ph: { type: Number },
    qt: { type: Number},
  }]
});

module.exports = mongoose.model("Cowprod", cowprodSchema);
