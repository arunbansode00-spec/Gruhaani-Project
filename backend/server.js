require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("Mongo Error:", err));

app.get("/", (req, res) => {
  res.send("Gruhaani Backend Running");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});
const propertyRoutes = require("./routes/propertyRoutes");
app.use("/api/properties", propertyRoutes);
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const enquiryRoutes = require("./routes/enquiryRoutes");
app.use("/api/enquiries", enquiryRoutes);