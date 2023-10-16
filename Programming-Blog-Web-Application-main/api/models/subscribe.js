const mongoose = require("mongoose");
const SubscribeEmailSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
      },
      email: [{
        type: String,
      }]
    },
    { timestamps: true }
  );
  //creating a schema in mongodb
module.exports = mongoose.model("SubscribeEmail", SubscribeEmailSchema);