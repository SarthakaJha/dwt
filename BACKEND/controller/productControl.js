import asyncHandler from "express-async-handler";
import axios from "axios";
import Product from "../models/productModel.js";
import Project from "../models/projectModel.js";
import  checkDuration  from "../utils/date.js";
import getEnergyData  from "../utils/WeatherData.js"

export const createProduct = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  // Check if project exists
  if (!projectId) {
    res.status(404);
    throw new Error("Project not found");
  }

  const { name, lat, lon, angle, direction, area } = req.body;
  if (!name || !lat || !lon || !angle || !direction || !area) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  // Create the new product
  const product = await Product.create({
    project: projectId, // Assign the project ID
    name, // Shorthand property name for name: name
    lat, // Shorthand property name for lat: lat
    lon, // Shorthand property name for lon: lon
    angle, // Shorthand property name for angle: angle
    direction, // Shorthand property name for direction: direction
    area, // Shorthand property name for area: area
  });

  res.status(201).json(product);
});


export const fetchProduct = asyncHandler(async (req, res) => {
  // Check if project and the product actually exist
  const { projectId, id } = req.params;

  // Find the project by ID
  const project = await Project.findById(projectId);
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  // Find the product by ID and project
  const product = await Product.findOne({ _id: id, project: projectId }).select(
    "-dailyReport"
  );

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Check if user has access to the project
  if (!project.user.equals(req.user._id)) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  // Return the product data
  res.status(200).json(product);
});



export const updateProductdata = asyncHandler(async (req, res) => {
   // Check if project and the product actually exist
   const { projectId, id } = req.params;

   const project = await Project.findById(projectId);
   if (!project) {
     res.status(404);
     throw new Error("Project not found");
   }
 
   const product = await Product.findById(
     { _id: id, project: projectId },
     { dailyReport: 0 }
   );
   if (!product) {
     res.status(404);
     throw new Error("Product not found");
   }
 
   // Check if user has access to the project
   if (req.user.id.toString() !== project.user.toString()) {
     res.status(401);
     throw new Error("User not authorized to access this project");
   }
 
   // Check if product is already closed
   if (product.isClosed) {
     throw new Error(
       "Product is already closed. You cannot do any more changes to this product."
     );
   }
 
   const { name, lat, lon, tilt, orientation } = req.body;
   if (!name || !lat || !lon || !tilt || !orientation) {
     res.status(400);
     throw new Error("Please enter all fields");
   }
 
   const response = await Product.findOneAndUpdate(
     { _id: id },
     {
       $set: {
        project: projectId,
        name: name,
        lat: lat,
        lon: lon,
        tilt: tilt,
        orientation: orientation,
      },
    },
    {
    returnOriginal: false,
    projection: { dailyReport: 0 },
    }
   );
 
   res.status(200).json(response);
});

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
