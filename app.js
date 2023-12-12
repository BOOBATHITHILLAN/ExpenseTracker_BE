import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";
dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

//atlas url
const url = process.env.MONGO_URL;

//mongodb connect
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to atlas mongodb");
  })
  .catch((err) => {
    console.error(err);
  });

// Router
app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Expense Tracker!");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listening on port  ${port}`);
});
