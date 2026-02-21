const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {

    // 🔎 Debug (you can remove later)
    console.log("HEADERS RECEIVED:", req.headers);

    // ✅ read authorization header safely
    const authHeader =
      req.headers.authorization || req.headers.Authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // ✅ must be Bearer token
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const token = authHeader.split(" ")[1];

    // ✅ verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified;
    next();

  } catch (err) {
    console.log("AUTH ERROR:", err.message);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;