import express from 'express';
import {
  createProject,
  getProjects,
  getProject,
}  from "../controller/projectControl.js";
import {
  createProduct,
  generateProductReport,
}  from "../controller/productControl.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

// Routes for project
router.post("/", protect, createProject);
router.get("/", protect, getProjects);
router.get("/:id", protect, getProject);

// Routes for product in project
router.post("/:projectId/products", protect, createProduct);
router.get("/:projectId/products/:id/generate-report", protect, generateProductReport);

export default router;
