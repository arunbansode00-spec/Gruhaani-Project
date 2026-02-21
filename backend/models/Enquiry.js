const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true
    },

    name: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    message: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Enquiry", enquirySchema);