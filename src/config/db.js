const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not set. Please configure your MongoDB connection string.");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    process.exit(1);
  }
};

module.exports = connectDB;