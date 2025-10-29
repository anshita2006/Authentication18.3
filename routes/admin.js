import express from "express";
import { verifyToken, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, authorizeRoles("Admin"), (req, res) => {
  res.json({
    message: "Welcome to the Admin dashboard",
    user: req.user
  });
});

export default router;
