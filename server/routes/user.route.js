import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { deleteUser, getUser } from "../controllers/user.controller.js";
const router = express.Router();

router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/:id", getUser);

export default router;
