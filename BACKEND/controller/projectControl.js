import asyncHandler from "express-async-handler";
import Project from "../models/projectModel.js";
import SendMail from "../utils/mailler.js";
import  checkDuration  from "../utils/date.js";
import getEnergyData  from "../utils/WeatherData.js"
import WeatherData from "../utils/WeatherData.js";
import ModifiedDate from "../utils/date.js"
import Convertor from "../utils/Convertor.js";
// Create a new project
export const createProject = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("Please enter project title");
  }

  const project = await Project.create({ name: name, user: req.user.id });
  const projectData = {
    _id: project._id,
    name: project.name,
    isClosed: project.isClosed,
    createdAt: project.createdAt,
    closedAt: project.updatedAt,
    products: [],
  };

  res.status(201).json(projectData);
});

export const fetchPtoject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  // Check if user allowed to access the project
  if (req.user.id.toString() !== project.user.toString()) {
    res.status(401);
    throw new Error("User not authorized to access this project");
  }

  // Get all products related to the project
  const products = await Product.find(
    { project: project.id },
    { dailyReport: 0 }
  );

  const projectData = {
    _id: project._id,
    name: project.name,
    isClosed: project.isClosed,
    createdAt: project.createdAt,
    closedAt: project.updatedAt,
    products,
  };

  res.status(200).json(projectData);
});

// Get all projects of a user
export const fetchProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ user: req.user.id });

  res.status(200).json(projects);
});

// Get a specific project by ID
export const fetchProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  // Check if user allowed to access the project
  if (req.user.id.toString() !== project.user.toString()) {
    res.status(401);
    throw new Error("User not authorized to access this project");
  }

  // Get all products related to the project
  const products = await Product.find(
    { project: project.id },
    { dailyReport: 0 }
  );

  const projectData = {
    _id: project._id,
    name: project.name,
    isClosed: project.isClosed,
    createdAt: project.createdAt,
    closedAt: project.updatedAt,
    products,
  };

  res.status(200).json(projectData);
});

// Generate a report for a project
export const createProjectReport = asyncHandler(async (req, res) => {
  // Implementation for generating a project report
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  // Check if user allowed to access the project
  if (req.user.id.toString() !== project.user.toString()) {
    res.status(401);
    throw new Error("User not authorized to access this project");
  }

  // Check if project is already closed
  if (project.isClosed) {
    res.status(400);
    throw new Error(
      "Project is already closed. You cannot generate any more reports"
    );
  }

  const productLocations = await Product.find(
    { project: project._id, isClosed: false },
    { name: 1, lat: 1, lon: 1, area: 1 }
  );

  if (productLocations.length === 0) {
    throw new Error(
      "There are no product locations. You cannot generate a report"
    );
  }

  // get the energy data for each product over 30 days and generate its CSV file
  const attachmentList = [];
  const weatherDataList = await WeatherData(productLocations);
  weatherDataList.forEach(async (weatherData) => {
    const filename = weatherData.name + ".csv";
    const filepath = Convertor(weatherData.data, filename);
    attachmentList.push({ filename: filename, path: filepath });

    // Update product report data and close the product
    await Product.findByIdAndUpdate(weatherData._id, {
      dailyReport: weatherData.data,
      isClosed: true,
    });
  });

  // Send email with the files generated to the user
  const struct_mail = {
    to: req.user.email,
    subject: `Energy Report for ${project.name}`,
    text: `Please find the reports for products in the project ${project.name} in the attachments below`,
    attachments: attachmentList,
  };
  await SendMail(struct_mail);

  // Close the project
  await Project.findOneAndUpdate(project._id, { isClosed: true });

  res.status(200).json({
    message:
      "Report has been generated. Please check your email for more information",
  });
});

// module.exports = {
//   createProject,
//   getProjects,
//   getProject,
//   generateReport,
// };
