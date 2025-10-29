import express from "express";
import { verifyToken, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, authorizeRoles("Moderator"), (req, res) => {
  res.json({
    message: "Welcome to the Moderator panel",
    user: req.user
  });
});

export default router;
