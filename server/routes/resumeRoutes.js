const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const {
    createResume,
    getResume,
    updateResume,
    deleteResume,getResumeById
} = require("../controllers/resumeController");

router.post("/create", protect, createResume);

router.get("/", protect, getResume);
router.get("/:id", protect, getResumeById);

router.put("/:id", protect, updateResume);

router.delete("/:id", protect, deleteResume);

module.exports = router;