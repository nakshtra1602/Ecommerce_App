import Express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import cors from "cors";
// import path from "path";
// import { fileURLToPath } from "url";

//configure env
dotenv.config();

// Initialize the Express App
const app = new Express();

// Mongodb Conncection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(process.env.MONGODB_URL);
  } catch (e) {
    console.log(`Error in MOngodb ${e}`);
  }
};

connectDB();

const db = mongoose.connection;

db.on("connected", () => {
  console.log("db connection open");
});

// const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
// const __dirname = path.dirname(__filename);

app.use(cors());
app.use(Express.json());
// app.use(Express.static(path.join(__dirname, "./client/build")));

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to ecommerce app",
  });
});

// Routes

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

// PORT
const PORT = process.env.PORT || 8080;

// start app
app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.DEV_MODE} node on port ${PORT}`
  );
});
