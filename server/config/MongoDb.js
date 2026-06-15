import mongoose from "mongoose";

const MongoDb = async function () {
  mongoose.connection.on("connected", () => {
    console.log("Database Conneted");
  });
  mongoose.connection.on("error", (err) => {
    console.log("Database Error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Database Disconnected");
  });
  await mongoose.connect("mongodb://localhost:27017/Server-matrix");
};

export default MongoDb;
