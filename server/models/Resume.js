const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    personalInfo: {
      fullName: String,
      email: String,
      phone: String,
      linkedin: String,
      github: String,
    },

    summary: {
      type: String,
    },

    education: [
      {
        college: String,
        degree: String,
        cgpa: String,
        startYear: Number,
        endYear: Number,
      },
    ],

    skills: [
      {
        name: String,
      },
    ],

    projects: [
      {
        title: String,
        description: String,
        technologies: String,
        githubLink: String,
      },
    ],

   

    achievements: [
      {
        title: String,
      },
    ],
    template: {
      type: String,
      default: "classic",
  },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resume", resumeSchema);
