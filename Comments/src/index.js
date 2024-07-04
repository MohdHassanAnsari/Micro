// src/index.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // Add this line
const commentRoutes = require("./routes/commentRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // Add this line

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/apis", commentRoutes); // Adjust the base path if needed

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/`);
});
