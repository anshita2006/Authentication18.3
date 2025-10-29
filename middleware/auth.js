import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers["auth"];
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1] || authHeader;
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: insufficient role" });
    }
    next();
  };
};
