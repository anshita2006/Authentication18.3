import express from "express";
import { verifyToken, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, authorizeRoles("User", "Admin", "Moderator"), (req, res) => {
  res.json({
    message: "Welcome to your profile",
    user: req.user
  });
});

export default router;
