const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    fullname: { type: String, default:"" },
    bucket_ids:{type:Array,default:[]},
    tokens:{type:Array,default:[]},
    password: { type: String, },
});

module.exports = mongoose.model("User", UserSchema);
