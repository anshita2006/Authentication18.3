import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import adminRoutes from "./routes/admin.js";
import moderatorRoutes from "./routes/moderator.js";
import userRoutes from "./routes/user.js";

dotenv.config();
const app = express();
app.use(bodyParser.json());

const users = [
  { id: 1, username: "adminUser", password: "admin123", role: "Admin" },
  { id: 2, username: "modUser", password: "mod123", role: "Moderator" },
  { id: 3, username: "normalUser", password: "user123", role: "User" },
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

app.use("/admin-dashboard", adminRoutes);
app.use("/moderator-panel", moderatorRoutes);
app.use("/user-profile", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
