import mongoose from "mongoose";

const connectToDatabase = () => {
  mongoose.connect(process.env.MONGO_URL);

  const connection = mongoose.connection;

  connection.on("error", (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(1);
  });

  connection.once("open", () => {
    console.log("Database connection successful");
  });

  return connection;
};

export default connectToDatabase;
