const mongoose = require("mongoose");

// Create cached connection variable
let cachedDb = false;

// A function for connecting to MongoDB,
// taking a single paramater of the connection string
async function connectToDatabase() {
  // If the database connection is cached,
  // use it instead of creating a new connection
  if (cachedDb) {
    return;
  }

  cachedDb = true;
  mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true }
  );
  mongoose.Promise = global.Promise;
  mongoose.connection
    .once("open", () => console.log("Connected to MongoLab instance."))
    .on("error", error => console.log("Error connecting to MongoLab:", error));
}

export { connectToDatabase };
