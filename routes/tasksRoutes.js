import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { body, param } from "express-validator";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTask,
} from "../controllers/tasksController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", [body("title").isLength({ min: 1 })], createTask);
router.get("/", getTasks);
router.get("/:id", [param("id").isMongoId()], getTask);
router.put("/:id", [param("id").isMongoId()], updateTask);
router.delete("/:id", [param("id").isMongoId()], deleteTask);

export default router;
