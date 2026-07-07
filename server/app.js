const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const aiRoutes = require("./routes/aiRoutes");
const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://career-forge-fsam-9hdt0oc5p-single9.vercel.app",
    ],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/ai", aiRoutes);
app.get("/",(req,res)=>{
    res.send("careerFORGE IS RUNNING from backend")
})

module.exports = app;
