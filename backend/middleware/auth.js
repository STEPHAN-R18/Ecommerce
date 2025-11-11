// backend/middleware/auth.js
import jwt from "jsonwebtoken";

// ✅ Middleware to verify JWT and attach user to req
export const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("🪪 Auth Header:", authHeader);

  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  console.log("🔐 Extracted Token:", token?.substring(0, 25) + "...");

  if (!token) return res.status(401).json({ message: "Invalid token" });

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30"
    );

    console.log("✅ Decoded Token:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    return res.status(403).json({ message: "Invalid token" });
  }
};

// ✅ Middleware to check if user is admin
export const isAdmin = (req, res, next) => {
  if (!req.user)
    return res.status(401).json({ message: "Not authenticated" });

  // Adjust based on your user model (could be req.user.role or req.user.isAdmin)
  if (req.user.role !== "admin" && !req.user.isAdmin)
    return res.status(403).json({ message: "Forbidden: Admins only" });

  next();
};
