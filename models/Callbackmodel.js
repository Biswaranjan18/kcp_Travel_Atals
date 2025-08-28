const mongoose = require("mongoose");


const callbackSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"]
    }
  },
  { timestamps: true }
);

const Callback = mongoose.model("Callback", callbackSchema);
module.exports = Callback;

