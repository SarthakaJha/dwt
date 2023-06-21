const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");

// Create a new project
const createProject = asyncHandler(async (req, res) => {
  const { name } = req.body;
  
  if (!name) {
    res.status(400).json({ error: "Please enter the project title" });
    return;
  }

  const project = await Project.create({ name, user: req.user.id });

  res.status(201).json({
    id: project._id,
    name: project.name,
  });
});

// Get all projects of a user
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ user: req.user.id });

  res.status(200).json(projects);
});

// Get a specific project by ID
const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  if (req.user.id.toString() !== project.user.toString()) {
    res.status(401).json({ error: "User not authorized to access this project" });
    return;
  }

  res.status(200).json(project);
});

// Generate a report for a project
const generateReport = asyncHandler(async (req, res) => {
  // Implementation for generating a project report
});

module.exports = {
  createProject,
  getProjects,
  getProject,
  generateReport,
};
