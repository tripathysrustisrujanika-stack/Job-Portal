const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    console.log("📌 MONGODB_URI from env:", mongoURI ? "✅ Loaded" : "❌ Not loaded");
    console.log("📍 Connection string preview:", mongoURI ? mongoURI.substring(0, 50) + "..." : "N/A");

    if (!mongoURI) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }

    console.log("🔗 Attempting to connect to MongoDB...");

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    if (error.message.includes("ECONNREFUSED")) {
      console.error("💡 Hint: Make sure MongoDB is running or MONGODB_URI points to a valid Atlas cluster");
    }
    // Retry logic: attempt reconnection after 5 seconds
    console.log("🔄 Retrying connection in 5 seconds...");
    setTimeout(() => {
      connectDB();
    }, 5000);
  }
};

module.exports = connectDB;