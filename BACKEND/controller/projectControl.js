import asyncHandler from "express-async-handler";
import Project from "../models/projectModel.js";

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
});

// module.exports = {
//   createProject,
//   getProjects,
//   getProject,
//   generateReport,
// };
