const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes= require("./routes/auth.js");
dotenv.config();
const app= express();
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(`Error connecting to MongoDb:`,err));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});