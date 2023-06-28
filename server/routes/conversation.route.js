import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  createConversation,
  getConversations,
  getSingleConversation,
  updateConversation,
} from "../controllers/conversation.controller.js";
const router = express.Router();

router.post("/", verifyToken, createConversation);
router.put("/:id", verifyToken, updateConversation);
router.get("/", verifyToken, getConversations);
router.get("/single/:id", verifyToken, getSingleConversation);

export default router;
