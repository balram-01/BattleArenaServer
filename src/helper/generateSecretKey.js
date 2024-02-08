const crypto = require('crypto');

// Function to generate a random JWT secret key
const generateJWTSecret = () => {
    // Generate a random buffer of 32 bytes (256 bits)
    const buffer = crypto.randomBytes(32);
    // Convert buffer to base64 string
    const secret = buffer.toString('base64');
    return secret;
};

// Example usage
const jwtSecret = generateJWTSecret();
console.log("JWT Secret Key:", jwtSecret);
