import asyncHandler from "express-async-handler";
import axios from "axios";
import Product from "../models/productModel.js";
import Project from "../models/projectModel.js";
import  checkDuration  from "../utils/date.js";

export const createProduct = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  // Check if project exists
  if (!projectId) {
    res.status(404);
    throw new Error("Project not found");
  }

  const { name, lat, lon, tilt, orientation } = req.body;
  if (!name || !lat || !lon || !tilt || !orientation) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const product = await Product.create({
    project: projectId,
    name,
    lat,
    lon,
    tilt,
    orientation,
  });

  res.status(201).json(product);
});

export const getProduct = asyncHandler(async (req, res) => {});

export const updateProduct = asyncHandler(async (req, res) => {});

export const generateProductReport = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  //   check for user permissions here

  const { date1, date2 } = checkDuration();

  // Call weatherbit API here
  const apiUrl = `https://api.weatherbit.io/v2.0/history/daily?lat=${product.lat}&lon=${product.lon}&start_date=${date2}&end_date=${date1}&key=${process.env.WEATHER_API_KEY}`;
  const response = await axios.get(apiUrl);
  const { data: weatherDataSet } = response.data;

  const dailyReportList = weatherDataSet.map((dataset) => {
    const { max_dni, datetime, max_temp_ts } = dataset;

    const tempCofficient = new Date(max_temp_ts * 1000);
    const tempCofficientInHours = tempCofficient.getHours();

    const generatedElectricity =
      (product.area * max_dni * tempCofficientInHours) / 1000;

    return {
      irradiance: max_dni,
      date: datetime,
      electricity: generatedElectricity,
    };
  });

  const updatedProduct = await Product.updateOne(
    { _id: product._id },
    { $set: { dailyReport: dailyReportList } }
  );

  res.status(200).json(updatedProduct);
});
