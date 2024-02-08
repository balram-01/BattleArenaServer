const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./db/database');
const errorHandler = require('./middlewares/errorHandler');
const dotenv = require('dotenv');
dotenv.config({ path: './src/config/.env' });

const userRoutes = require('./routes/user');
const { PORT, MONGODB_URI } = require("./config/config");
const verifyToken = require('./middlewares/verifyToken');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/user', userRoutes);

// Connect to the database
connectToDatabase(MONGODB_URI);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
