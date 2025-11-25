import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { body } from "express-validator";

const router = express.Router();

router.get("/", authMiddleware, getProfile);

router.put(
  "/:id",
  authMiddleware,
  [
    body("name").optional().isLength({ min: 2 }),
    body("email").optional().isEmail(),
  ],
  updateProfile
);

export default router;
