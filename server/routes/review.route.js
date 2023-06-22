import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  addReview,
  deleteReview,
  getReviews,
} from "../controllers/review.controller.js";
const router = express.Router();

router.post("/", verifyToken, addReview);
router.get("/:gigId", getReviews);
router.delete("/:id", verifyToken, deleteReview);
export default router;
