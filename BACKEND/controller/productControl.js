import asyncHandler from "express-async-handler";
import axios from "axios";
import Product from "../models/productModel.js";
import Project from "../models/projectModel.js";
import  checkDuration  from "../utils/date.js";
import getEnergyData  from "../utils/WeatherData.js"
import SendMail from "../utils/mailler.js"

// check if usable
/*
async function findProduct(req, res) {
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
    throw new Error("Product is now inactive");
  }
}

*/



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
       "Product is now inactive"
     );
   }
 
  const { name, lat, lon, angle, direction } = req.body;
  if (!name || !lat || !lon || !angle || !direction) {
    res.status(400);
    throw new Error("Please enter all fields");
   }
 
   const response = await Product.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        project: projectId,
        name,
        lat,
        lon,
        angle,
        direction,
      },
    },
    {
      new: true,
      projection: { dailyReport: 0 },
    }
  );
 
   res.status(200).json(response);
});

export const createProductReport = asyncHandler(async (req, res) => {
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

  if (product.isClosed) {
    res.status(400);
    throw new Error(
      "Product report already generated. The Project is now inactive"
    );
  }

  //   check for user permissions here

  const { date1: end_date, date2: start_date } = checkDuration();
  console.log('end_date:', end_date);
  console.log('start_date:', start_date);
  
  const dailyReportList = await getEnergyData(
    product.lat,
    product.lon,
    start_date,
    end_date,
    product.area
  );

  res.status(200).json({
    message:
      "Report has been generated. Please check your email for more information",
  });
});

