import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productsRoutes from "./routes/product.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json()); // allows us to accept json data in res.body

app.use("/api/products", productsRoutes);

app.get("/api/products/hello", (req, res) => {
  res.send("Hello, from the server!");
});

app.listen(port, () => {
  connectDB();
  console.log("Server is running on port http://localhost:5000");
});
