import express from "express";
import {
  createProject,
  fetchProjects,
  fetchProject,
  createProjectReport,
  deleteProject,
} from "../controller/projectControl.js";
import {
  createProduct,
  createProductReport,
  fetchProduct,
  updateProductdata,
} from "../controller/productControl.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

// Routes for project
router.post("/", protect, createProject);
router.get("/", protect, fetchProjects);
router.get("/:id", protect, fetchProject); /*unable to fetch by id*/
router.delete("/:id", protect, deleteProject);
router.get("/:id/generate-report", protect, createProjectReport);

// Routes for product in project
router.post("/:projectId/products", protect, createProduct);
router.get("/:projectId/products/:id", protect, fetchProduct);
router.get(
  "/:projectId/products/:id/generate-report",
  protect,
  createProductReport
);
router.post("/:projectId/products/:id", protect, updateProductdata);

export default router;
