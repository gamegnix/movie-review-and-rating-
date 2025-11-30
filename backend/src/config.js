require("dotenv").config();

module.exports = {
  // JWT Secret - should be in environment variables
  jwtSecret: process.env.JWT_SECRET || "your-secret-key-change-in-production",
  
  // MongoDB connection string
  mongoURI: process.env.MONGODB_URI || "mongodb://localhost:27017/moviereview",
  
  // Server port
  port: process.env.PORT || 4000,
  
  // Node environment
  nodeEnv: process.env.NODE_ENV || "development",
};

