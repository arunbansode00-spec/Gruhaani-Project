const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: Number,
      required: true
    },

    city: {
      type: String,
      required: true,
      trim: true
    },

    location: {
      type: String,
      trim: true
    },

    propertyType: {
      type: String,
      enum: ["Apartment", "Villa", "Plot", "House"],
      default: "Apartment"
    },

    bhk: {
      type: Number,
      default: 1
    },

    area: {
      type: Number // sqft
    },

    description: {
      type: String
    },

    images: {
      type: [String],
      default: []
    },
    ownerPhone: {
      type: String,
      default: "6360071844" // temporary default
    },

    // ✅ SOLD / AVAILABLE control
    status: {
      type: String,
      enum: ["available", "sold"],
      default: "available"
    }
  },
  {
    timestamps: true // automatically adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("Property", propertySchema);
