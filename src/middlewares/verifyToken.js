const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env; // Destructure the JWT_SECRET directly

const verifyToken = (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        const authHeader = req.headers.authorization;
        console.log("authHeader:", authHeader);

        // Check if the Authorization header exists
        if (!authHeader) {
            return res.status(401).json({ message: 'Unauthorized: No authorization header provided' });
        }

        // Split the Authorization header by space
        const tokenParts = authHeader.split(' ');
        console.log("tokenParts", tokenParts)
        // Check if the Authorization header has the correct format
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            return res.status(401).json({ message: 'Unauthorized: Invalid authorization header format' });
        }

        // Extract the token from the token parts
        const token = tokenParts[1];

        // Check if the token exists
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Attach the decoded user information to the request object
        req.user = decoded;

        // Call next to proceed to the next middleware/controller
        next();
    } catch (error) {
        // Handle token verification errors
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
};

module.exports = verifyToken;
