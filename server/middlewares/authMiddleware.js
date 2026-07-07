const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    // Check if header exists
    if (!authHeader) {
        return res.status(401).json({
            message: "No token provided",
        });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    // Check if token exists
    if (!token) {
        return res.status(401).json({
            message: "Token missing",
        });
    }

    try {
        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach decoded payload to request
        req.user = decoded;

        // Continue to the next middleware/controller
        next();
    } catch (error) {
        return res.status(403).json({
            message: "Invalid or expired token",
        });
    }
};

module.exports = protect;