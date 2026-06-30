const express = require("express");
const authRoutes = require("./routes/authRoutes");
const app = express();

// Middleware
app.use(express.json());
app.use("/api/auth", authRoutes);
app.get("/",(req,res)=>{
    res.send("careerFORGE IS RUNNING from backend")
})

module.exports = app;