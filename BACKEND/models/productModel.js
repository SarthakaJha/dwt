const mongoose = require("mongoose");

const regularReportSchema = new mongoose.Schema({
  irradiance: {
    type: Number,
    required: [true, "Please add latitude"],
  },
  date: {
    type: String,
    required: true,
  },
  electricity: {
    type: Number,
    required: [true, "Please add latitude"],
  },
});

const productSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please add project name"],
    },
    lat: {
      type: Number,
      required: [true, "Please add latitude"],
    },
    lon: {
      type: Number,
      required: [true, "Please add longitude"],
    },
    angle: {
      type: Number,
      required: [true, "Please add tilt"],
    },
    area: {
      type: Number,
      required: [true, "Please add area"],
    },
    direction: {
      type: String, // North,South,East,West {try to have enum values}
      required: [true, "Please add an orientation"],
    },
    dailyReport: [regularReportSchemaReportSchema],
    isClosed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;